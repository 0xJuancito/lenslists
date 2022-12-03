import ListCard, { IListCard } from '@/ui/ListCard';
import { ExploreListsResponse } from 'models/exploreListsResponse';

async function getData() {
  const res = await fetch('http://localhost:3000/api/lists/explore');
  const body = (await res.json()) as ExploreListsResponse;
  const lists = body.data.lists.items;
  const cards: IListCard[] = lists.map((list) => ({
    name: list.name,
    description: list.description,
    coverPictureUrl: list.coverPictureUrl || '',
    totalFollowers: list.stats.totalFollowers,
    totalMembers: list.stats.totalMembers,
    listId: list.id,
    ownerId: list.ownerProfile.id,
    ownerHandle: list.ownerProfile.handle,
  }));

  return cards;
}

export default async function Page() {
  const cards = await getData();

  return (
    <div>
      <div className="flex justify-between">
        <div className="z-0 my-8 w-full text-center text-4xl font-bold text-black sm:my-16 sm:text-5xl">
          Discover, create, and share awesome lists.
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, index) => (
          <ListCard key={index} {...card}></ListCard>
        ))}
      </div>
    </div>
  );
}
