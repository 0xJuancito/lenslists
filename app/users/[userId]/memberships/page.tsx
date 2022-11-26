import ListCard, { IListCard } from '@/ui/ListCard';

const list: IListCard = {
  name: 'Lens Protocol',
  description:
    'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
  coverPictureUrl:
    'https://lens.infura-ipfs.io/ipfs/bafkreifcrzlxswmv2isffdfnsl2pjd2hph5wem5c4vxlypugtrzf3gagrq',
  ownerHandle: 'juancito.lens',
  ownerId: '0x0e4b',
  totalFollowers: 41086,
  totalMembers: 22,
  listId: '1',
};

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {cards.map((item, index) => (
        <ListCard
          key={index}
          name={list.name}
          description={list.description}
          coverPictureUrl={list.coverPictureUrl}
          ownerHandle={list.ownerHandle}
          ownerId={list.ownerId}
          totalFollowers={list.totalFollowers}
          totalMembers={list.totalMembers}
          listId={list.listId}
        ></ListCard>
      ))}
    </div>
  );
}
