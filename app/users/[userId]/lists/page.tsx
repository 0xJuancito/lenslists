'use client';

import { GetOwnedListsResponse } from '@/lib/responses.types';
import ListCard, { IListCard } from '@/ui/ListCard';
import Loading from 'app/loading';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();

  const [cards, setCards] = useState<IListCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileId = pathname?.replace('/users/', '').replace('/lists', '');

    fetch(`/api/users/${profileId}/owned-lists`).then(async (res) => {
      const body = (await res.json()) as GetOwnedListsResponse;
      const lists = body.data.lists.items;
      const newCards: IListCard[] = lists.map((list) => ({
        name: list.name,
        description: list.description,
        coverPictureUrl: list.coverPictureUrl || '',
        totalFollowers: list.stats.totalFollowers,
        totalMembers: list.stats.totalMembers,
        listId: list.id,
        ownerId: list.ownerProfile.id,
        ownerHandle: list.ownerProfile.handle,
      }));
      setCards(newCards);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="z-0 my-8 w-full text-center text-4xl font-bold text-black sm:my-16 sm:text-5xl">
          My Lists
        </div>
      </div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <ListCard key={index} {...card} editable={true}></ListCard>
          ))}
        </div>
      )}
    </div>
  );
}
