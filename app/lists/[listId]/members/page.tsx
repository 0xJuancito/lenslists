'use client';

import { profiles } from '@/lib/lens/get-profiles';
import {
  ApiList,
  GetListMembersResponse,
  ListResponse,
} from '@/lib/responses.types';
import ProfileCard, { IProfileCard } from '@/ui/ProfileCard';
import Loading from 'app/loading';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const pathname = usePathname();

  const [cards, setCards] = useState<IProfileCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ApiList | null>(null);

  useEffect(() => {
    const listId = pathname?.replace('/lists/', '').replace('/members', '');

    const loadingMembers = fetch(`/api/lists/${listId}/members`).then(
      async (res) => {
        const body = (await res.json()) as GetListMembersResponse;
        const membersIds = body.data.members.items.map(
          (member) => member.profileId,
        );
        const users = (await profiles(membersIds)).items;
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
        }));
        setCards(newCards);
      },
    );

    const loadingList = fetch(`/api/lists/${listId}`).then(async (res) => {
      const body = (await res.json()) as ListResponse;
      setList(body.data.list);
    });

    Promise.all([loadingMembers, loadingList]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className="mb-8 flex flex-col justify-between">
            <div className="z-0 mt-8 mb-4 w-full text-center text-4xl font-bold text-black sm:mt-16 sm:text-5xl">
              {list?.name}
            </div>
            <div className="z-0 w-full text-center text-black">
              {list?.description}
            </div>
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
              ></ProfileCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
