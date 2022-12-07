'use client';

import { getAuthenticationToken } from '@/lib/apollo-client';
import { profiles } from '@/lib/lens/get-profiles';
import { getFromLocalStorage } from '@/lib/lensStorage';
import { ProfileContext } from '@/ui/LensAuthenticationProvider';
import ProfileCard, { IProfileCard } from '@/ui/ProfileCard';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Loading from 'app/loading';
import { List } from 'models/list';
import { ListResponse } from 'models/listResponse';
import { MembersResponse } from 'models/membersResponse';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Page() {
  const pathname = usePathname();
  const { openConnectModal } = useConnectModal();

  const [cards, setCards] = useState<IProfileCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<List | null>(null);

  const [favorite, setFavorite] = useState(false);

  const profile = useContext(ProfileContext);

  useEffect(() => {
    const listId = pathname?.replace('/lists/', '');

    const loadingMembers = fetch(`/api/lists/${listId}/members`).then(
      async (res) => {
        const body = (await res.json()) as MembersResponse;
        const membersIds = body.data.members.items.map(
          (member) => member.profileId,
        );
        const users = membersIds.length
          ? (await profiles(membersIds)).items
          : [];
        const newCards: IProfileCard[] = users.map((user) => ({
          name: user.name || '',
          bio: user.bio || '',
          // @ts-ignore
          coverPictureUrl: user.coverPicture?.original?.url,
          // @ts-ignore
          picture: user.picture?.original?.url,
          handle: user.handle,
          profileId: user.id,
          totalFollowing: user.stats.totalFollowing,
          totalFollowers: user.stats.totalFollowers,
          isFollowedByMe: user.isFollowedByMe,
        }));
        setCards(newCards);
      },
    );

    const ls = getFromLocalStorage();
    const fetchRequest = ls?.id
      ? fetch(`/api/lists/${listId}?profileId=${ls.id}`)
      : fetch(`/api/lists/${listId}`);

    const loadingList = fetchRequest.then(async (res) => {
      const body = (await res.json()) as ListResponse;
      setList(body.data?.list);
      setFavorite(Boolean(body.data?.list.favorite));
    });

    Promise.all([loadingMembers, loadingList]).then(() => {
      setLoading(false);
    });
  }, []);

  const toggleFavorite = () => {
    if (openConnectModal) {
      openConnectModal();
      return;
    }

    if (favorite) {
      fetch(`/api/lists/${list?.id}/favorites/${profile?.id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': getAuthenticationToken() || '',
        },
      });
    } else {
      fetch(`/api/lists/${list?.id}/favorites`, {
        method: 'POST',
        headers: {
          'x-access-token': getAuthenticationToken() || '',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileId: profile?.id }),
      });
    }
    setFavorite(!favorite);
  };

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className="mb-8 flex flex-col items-center justify-center">
            <div className="z-0 mt-8 mb-4 flex w-full justify-center text-4xl font-bold text-black sm:mt-16 sm:text-5xl">
              {list?.name}
            </div>
            <div className="z-0 flex w-full justify-center text-black">
              {list?.description}
            </div>
            <button
              className="mt-6 mb-4 flex w-48 cursor-default justify-center rounded-2xl bg-red-400 px-4 py-2 text-white shadow-md hover:cursor-pointer hover:bg-red-500"
              onClick={toggleFavorite}
            >
              {favorite ? '♥ In Favorites' : '♡ Add to Favorites'}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((user, index) => (
              <ProfileCard
                key={index}
                name={user.name}
                bio={user.bio}
                coverPictureUrl={user.coverPictureUrl}
                picture={user.picture}
                handle={user.handle}
                profileId={user.profileId}
                totalFollowing={user.totalFollowing}
                totalFollowers={user.totalFollowers}
                isFollowedByMe={user.isFollowedByMe}
              ></ProfileCard>
            ))}
          </div>
          {!cards.length ? (
            <div className="flex justify-center">This list has no members</div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}
