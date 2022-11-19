import Image from 'next/image';
import Link from 'next/link';

export type IListCard = {
  title: string;
  description: string;
  coverPicture: string;
  picture: string;
  followersCount: number;
  membersCount: number;
  listId: string;
  ownerId: string;
  ownerHandle: string;
};

export default function ListCard({
  title,
  description,
  coverPicture,
  picture,
  ownerHandle,
  followersCount,
  membersCount,
  listId,
  ownerId,
}: IListCard) {
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-lg">
      {/* Cover Picture */}
      <div>
        <Image
          unoptimized
          src={coverPicture}
          height={450}
          width={800}
          className="aspect-video rounded-t-xl object-cover object-center"
          alt="Cover Picture"
        />
        {/* Profile Picture */}
        <div className="absolute">
          <Image
            unoptimized
            src={picture}
            height={150}
            width={150}
            alt="Profile Picture"
            className="relative left-2 top-[-32px] h-[85px] w-[85px] rounded-lg border-4 border-zinc-50 sm:top-[-55px] sm:h-28 sm:w-28 xl:top-[-32px] xl:h-[85px] xl:w-[85px]"
          />
        </div>
      </div>

      {/* Body */}
      <div
        className="flex w-full grow flex-col gap-3 px-4 pb-4"
        style={{ wordBreak: 'break-word' }}
      >
        {/* Title + Handle */}
        <div className="w-full pl-[85px] sm:pl-28 xl:pl-[85px]">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-black sm:text-xl xl:text-lg">
            {title}
          </div>
          <div className="text-xs">
            <span className="flex gap-1">
              by
              <Link href={`/users/${ownerId}/lists`}>
                <span className="cursor-pointer font-bold hover:underline">
                  @{ownerHandle}
                </span>
              </Link>
            </span>
          </div>
        </div>

        {/* Followers + Members */}
        <div className="mt-1 flex justify-center gap-4 text-xs">
          <Link
            className="rounded-xl bg-sky-500 py-1 px-2 text-white hover:bg-sky-600"
            href={
              listId
                ? `/lists/${listId}/followers`
                : `/users/${ownerId}/followers`
            }
          >
            <span className="flex cursor-pointer gap-1">
              <span>{followersCount}</span>
              <span>followers</span>
            </span>
          </Link>
          <Link
            className="rounded-xl bg-sky-500 py-1 px-2 text-white hover:bg-sky-600"
            href={`/lists/${listId}/members`}
          >
            <span className="flex cursor-pointer gap-1">
              <span>{membersCount}</span>
              <span>members</span>
            </span>
          </Link>
        </div>

        {/* Description */}
        <div className="flex grow items-center text-sm">
          <div className="overflow-hidden" style={{ maxHeight: '60px' }}>
            {description}
          </div>
        </div>

        {/* Follow */}
        <button className="mt-2 mb-1 cursor-pointer rounded-2xl bg-lime-300 px-4 py-2 text-black shadow-md hover:bg-lime-200">
          FOLLOW
        </button>
      </div>
    </div>
  );
}
