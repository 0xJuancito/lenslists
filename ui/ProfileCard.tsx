'use client';

import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

export type IProfileCard = {
  name: string;
  bio: string;
  coverPictureUrl: string;
  picture: string;
  handle: string;
  profileId: string;
  totalFollowers: number;
  totalFollowing: number;
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
}: IProfileCard) {
  const BIO_MAX_LENGTH = 100;
  if (bio.length >= BIO_MAX_LENGTH) {
    bio = `${bio.slice(0, BIO_MAX_LENGTH)}...`;
  }

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
          <Link href={`/users/${profileId}/following`}>
            <span className="flex cursor-pointer gap-1 hover:underline">
              <span className="font-bold">{totalFollowing}</span>
              <span>following</span>
            </span>
          </Link>
          <Link href={`/users/${profileId}/followers`}>
            <span className="flex cursor-pointer gap-1 hover:underline">
              <span className="font-bold">{totalFollowers}</span>
              <span>{totalFollowers === 1 ? 'follower' : 'followers'}</span>
            </span>
          </Link>
        </div>
        {/* Bio */}
        <div className="flex grow items-center text-center text-sm">
          <div className="overflow-hidden" style={{ maxHeight: '60px' }}>
            {bio}
          </div>
        </div>
        {/* Button */}
        <div className="w-full">
          <button className="mt-2 mb-1 w-full cursor-pointer rounded-2xl bg-lens-lime px-4 py-2 text-black shadow-md hover:bg-lens-lime-hover">
            FOLLOW
          </button>
        </div>
      </div>
    </div>
  );
}
