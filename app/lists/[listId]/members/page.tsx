'use client';

import { profiles } from '@/lib/lens/get-profiles';
import { GetListMembersResponse } from '@/lib/responses.types';
import ProfileCard, { IProfileCard } from '@/ui/ProfileCard';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const pathname = usePathname();

  const [cards, setCards] = useState<IProfileCard[]>([]);

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
        coverPicture: user.coverPicture?.original?.url,
        // @ts-ignore
        picture: user.picture?.original?.url,
        handle: user.handle,
        profileId: user.id,
        followingCount: user.stats.totalFollowing,
        followersCount: user.stats.totalFollowers,
      }));
      setCards(newCards);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((user, index) => (
        <ProfileCard
          key={index}
          name={user.name}
          bio={user.bio}
          coverPicture={user.coverPicture}
          picture={user.picture}
          handle={user.handle}
          profileId={user.profileId}
          followingCount={user.followingCount}
          followersCount={user.followersCount}
        ></ProfileCard>
      ))}
    </div>
  );
}
