'use client';

import { profiles } from '@/lib/lens/get-profiles';
import { GetListMembersResponse } from '@/lib/responses.types';
import ProfileCard, { IProfileCard } from '@/ui/ProfileCard';
import Loading from 'app/loading';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const pathname = usePathname();

  const [cards, setCards] = useState<IProfileCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listId = pathname?.replace('/lists/', '').replace('/members', '');

    fetch(`/api/lists/${listId}/members`).then(async (res) => {
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
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="z-0 my-8 w-full text-center text-4xl font-bold text-black sm:my-16 sm:text-5xl">
          List Members
        </div>
      </div>
      {loading ? (
        <Loading></Loading>
      ) : (
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
      )}
    </div>
  );
}
