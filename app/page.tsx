import { getExploreLists } from '@/lib/lenslists';
import ListCard, { IListCard } from '@/ui/ListCard';

export const revalidate = 300; // revalidate this page every 5 minutes

async function getData() {
  const lists = await getExploreLists();

  const cards: IListCard[] = lists.map((list) => ({
    name: list.name,
    description: list.description,
    coverPictureUrl: list.coverPictureUrl || '',
    totalFavorites: list.totalFavorites,
    totalMembers: list.totalMembers,
    listId: list.id,
    ownerId: list.id,
    ownerHandle: list.ownedByHandle,
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
