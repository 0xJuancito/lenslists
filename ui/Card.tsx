import Image from 'next/image';

export type ICard = {
  title: string;
  description: string;
  coverPicture: string;
  picture: string;
  ownedBy?: string;
  handle?: string;
  followers?: number;
  members?: number;
  memberships?: number;
  follow?: boolean;
  explore?: boolean;
};

export default function Card({
  title,
  description,
  coverPicture,
  picture,
  ownedBy,
  handle,
  followers,
  members,
  memberships,
  explore,
  follow,
}: ICard) {
  const DESCRIPTION_MAX_LENGTH = 100;
  if (description.length >= DESCRIPTION_MAX_LENGTH) {
    description = `${description.slice(0, DESCRIPTION_MAX_LENGTH)}...`;
  }

  return (
    <div className="flex flex-col items-center rounded-xl bg-white shadow-lg">
      {/* Cover Picture */}
      <div>
        <Image
          unoptimized
          src={coverPicture}
          height={300}
          width={900}
          className="h-32 rounded-t-xl object-cover object-center"
          alt="Cover Picture"
        />
      </div>
      {/* Profile Picture */}
      <div className="absolute">
        <Image
          unoptimized
          src={picture}
          height={150}
          width={150}
          alt="Profile Picture"
          className="relative top-12 rounded-full border-4 border-zinc-50"
        />
      </div>
      {/* Body */}
      <div
        className="mt-16 flex w-full grow flex-col items-center gap-3 p-4 text-center"
        style={{ wordBreak: 'break-word' }}
      >
        {/* Title */}
        <div className="w-full">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-black">
            {title}
          </div>
          <div className="text-xs">
            {ownedBy ? (
              <span className="flex justify-center gap-1">
                <span>by</span>
                <span className="cursor-pointer font-bold hover:underline">
                  @{ownedBy}
                </span>
              </span>
            ) : (
              ''
            )}
            {handle ? (
              <span className="cursor-pointer font-bold hover:underline">
                @{handle}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        {/* Followers / Members / Memberships */}
        <div className="flex gap-4 text-xs">
          {followers !== undefined ? (
            <span className="flex cursor-pointer gap-1 hover:underline">
              <span className="font-bold">{followers}</span>
              <span>followers</span>
            </span>
          ) : (
            ''
          )}
          {members !== undefined ? (
            <span className="flex cursor-pointer gap-1 hover:underline">
              <span className="font-bold">{members}</span>
              <span>members</span>
            </span>
          ) : (
            ''
          )}
          {memberships !== undefined ? (
            <span className="flex cursor-pointer gap-1 hover:underline">
              <span className="font-bold">{memberships}</span>
              <span>memberships</span>
            </span>
          ) : (
            ''
          )}
        </div>
        {/* Description */}
        <div className="flex grow items-center text-center text-sm">
          <div className="overflow-hidden" style={{ maxHeight: '60px' }}>
            {description}
          </div>
        </div>
        {/* Button */}
        <div>
          {explore ? (
            <button className="mt-2 mb-1 cursor-pointer rounded-2xl bg-sky-700 px-4 py-2 text-white shadow-md hover:bg-sky-800">
              EXPLORE
            </button>
          ) : (
            ''
          )}
          {follow ? (
            <button className="mt-2 mb-1 cursor-pointer rounded-2xl bg-lime-300 px-4 py-2 text-black shadow-md hover:bg-lime-200">
              FOLLOW
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
