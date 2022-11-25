'use client';

import { GetExploreListsResponse } from '@/lib/responses.types';
import ListCard, { IListCard } from '@/ui/ListCard';
import { useEffect, useState } from 'react';
import Loading from './loading';

const list = {
  title: 'Lens Protocol',
  description:
    'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
  coverPicture:
    'https://lens.infura-ipfs.io/ipfs/bafkreifcrzlxswmv2isffdfnsl2pjd2hph5wem5c4vxlypugtrzf3gagrq',
  ownerHandle: 'juancito.lens',
  ownerId: '0x0e4b',
  followersCount: 41086,
  membersCount: 22,
  listId: '1',
};

export default function Page() {
  const [cards, setCards] = useState<IListCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/lists/explore').then(async (res) => {
      const body = (await res.json()) as GetExploreListsResponse;
      const lists = body.data.lists.items;
      const newCards: IListCard[] = lists.map((list) => ({
        title: list.name,
        description: list.description,
        coverPicture: list.coverPictureUrl || '',
        followersCount: 0,
        membersCount: 0,
        listId: list.id,
        ownerId: list.ownedBy.profileId,
        ownerHandle: list.ownedBy.handle,
      }));
      setCards(newCards);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="z-0 my-8 w-full text-center text-4xl font-bold text-black sm:my-16 sm:text-5xl">
          Discover, create, and share awesome lists.
        </div>
      </div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <ListCard
              key={index}
              title={card.title}
              description={card.description}
              coverPicture={card.coverPicture}
              ownerHandle={card.ownerHandle}
              ownerId={card.ownerId}
              followersCount={card.followersCount}
              membersCount={card.membersCount}
              listId={card.listId}
            ></ListCard>
          ))}
        </div>
      )}
    </div>
  );
}
