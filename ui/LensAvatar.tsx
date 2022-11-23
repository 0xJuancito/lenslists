import { AvatarComponent } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { ProfileContext } from './LensAuthenticationProvider';

export const LensAvatar: AvatarComponent = () => {
  const profile = useContext(ProfileContext);

  return (
    <img
      src={profile?.pictureUrl || '/default-profile.png'}
      className="rounded-full"
      alt="Profile"
      width={50}
      height={50}
    />
  );
};
