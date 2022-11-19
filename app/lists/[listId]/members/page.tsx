import ProfileCard, { IProfileCard } from '@/ui/ProfileCard';

const profile: IProfileCard = {
  name: 'Lens Protocol',
  bio: 'A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.',
  coverPicture:
    'https://lens.infura-ipfs.io/ipfs/bafkreifcrzlxswmv2isffdfnsl2pjd2hph5wem5c4vxlypugtrzf3gagrq',
  picture:
    'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
  handle: 'lensprotocol.lens',
  profileId: '0x0e4b',
  followersCount: 41086,
  membershipsCount: 22,
};

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((item, index) => (
        <ProfileCard
          key={index}
          name={profile.name}
          bio={profile.bio}
          coverPicture={profile.coverPicture}
          picture={profile.picture}
          handle={profile.handle}
          profileId={profile.profileId}
          followersCount={profile.followersCount}
          membershipsCount={profile.membershipsCount}
        ></ProfileCard>
      ))}
    </div>
  );
}
