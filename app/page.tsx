import ListCard from '@/ui/ListCard';
import Image from 'next/image';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Page() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="z-0 my-8 w-full text-center text-4xl font-bold text-black sm:my-16 sm:text-5xl">
          Discover, create, and share awesome lists.
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
        {cards.map((item, index) => (
          <ListCard
            key={index}
            title={list.title}
            description={list.description}
            coverPicture={list.coverPicture}
            ownerHandle={list.ownerHandle}
            ownerId={list.ownerId}
            followersCount={list.followersCount}
            membersCount={list.membersCount}
            listId={list.listId}
          ></ListCard>
        ))}
      </div>
    </div>
  );
}
