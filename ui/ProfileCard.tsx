'use client';

import { proxyActionFreeFollow } from '@/lib/lens/proxy-action-free-follow';
import Link from 'next/link';
import { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { toast } from 'react-toastify';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export type IProfileCard = {
  name: string;
  bio: string;
  coverPictureUrl: string;
  picture: string;
  handle: string;
  profileId: string;
  totalFollowers: number;
  totalFollowing: number;
  isFollowedByMe?: boolean;
};

export default function ProfileCard({
  name,
  bio,
  coverPictureUrl,
  picture,
  handle,
  profileId,
  totalFollowers,
  totalFollowing,
  isFollowedByMe: initialIsFollowedByMe = false,
}: IProfileCard) {
  const [isFollowedByMe, setIsFollowedByMe] = useState(initialIsFollowedByMe);
  const { openConnectModal } = useConnectModal();

  const follow = () => {
    if (openConnectModal) {
      openConnectModal();
    } else {
      proxyActionFreeFollow(profileId);
      setIsFollowedByMe(true);
    }
  };

  return (
    <div className="flex flex-col items-center rounded-xl bg-white shadow-lg">
      {/* Cover Picture */}
      <div>
        <ImageWithFallback
          fallbackImage="/default-cover.jpeg"
          src={coverPictureUrl}
          height={300}
          width={900}
          className="h-32 rounded-t-xl object-cover object-center"
          alt="Cover Picture"
        />
      </div>
      {/* Profile Picture */}
      <div className="absolute">
        <ImageWithFallback
          fallbackImage="/default-profile.png"
          src={picture}
          height={150}
          width={150}
          alt="Profile Picture"
          className="relative top-12 rounded-full border-4 border-zinc-50 object-cover"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      {/* Body */}
      <div
        className="mt-16 flex w-full grow flex-col items-center gap-3 p-4 text-center"
        style={{ wordBreak: 'break-word' }}
      >
        {/* Name */}
        <div className="w-full">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-black">
            {name}
          </div>
          <div className="text-xs">
            <span className="flex justify-center gap-1">
              <Link
                href={`https://lenster.xyz/u/${handle}`}
                target={'_blank'}
                rel={'noreferrer'}
              >
                <span className="cursor-pointer font-bold hover:underline">
                  @{handle}
                </span>
              </Link>
            </span>
          </div>
        </div>
        {/* Following / Followers */}
        <div className="flex gap-4 text-xs">
          <span>
            <span className="flex gap-1">
              <span className="font-bold">{totalFollowing}</span>
              <span>following</span>
            </span>
          </span>
          <span>
            <span className="flex gap-1">
              <span className="font-bold">{totalFollowers}</span>
              <span>{totalFollowers === 1 ? 'follower' : 'followers'}</span>
            </span>
          </span>
        </div>
        {/* Bio */}
        <div className="flex grow items-center text-center text-sm">
          <div className="overflow-hidden line-clamp-3">{bio}</div>
        </div>
        {/* Button */}
        <div className="w-full">
          {isFollowedByMe ? (
            <button className="mt-2 mb-1 w-full cursor-default rounded-2xl bg-zinc-50 px-4 py-2 text-black shadow-md">
              FOLLOWING
            </button>
          ) : (
            <button
              className="mt-2 mb-1 w-full cursor-pointer rounded-2xl bg-lens-lime px-4 py-2 text-black shadow-md hover:bg-lens-lime-hover"
              onClick={follow}
            >
              FOLLOW
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
