import Card, { ICard } from '@/ui/Card';

const card: ICard = {
  title: 'Lens Protocol',
  description:
    'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
  coverPicture:
    'https://lens.infura-ipfs.io/ipfs/bafkreifcrzlxswmv2isffdfnsl2pjd2hph5wem5c4vxlypugtrzf3gagrq',
  picture:
    'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
  ownedBy: 'juancito.lens',
  followers: 41086,
  members: 22,
};

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map(() => (
        <Card
          title={card.title}
          description={card.description}
          coverPicture={card.coverPicture}
          picture={card.picture}
          ownedBy={card.ownedBy}
          followers={card.followers}
          members={card.members}
        ></Card>
      ))}
    </div>
  );
}
