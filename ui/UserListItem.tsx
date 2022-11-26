'use client';

import Image from 'next/image';

type IListUser = {
  pictureUrl: string;
  name: string;
  id: string;
  handle: string;
  isMember: boolean;
  onMemberChange: (user: IListUser, isMember: boolean) => void;
};

export default function UserListItem({
  pictureUrl,
  name,
  handle,
  isMember,
  id,
  onMemberChange,
}: IListUser) {
  return (
    <div className="flex cursor-pointer items-center justify-between px-6 py-2 hover:bg-zinc-50">
      <span className="flex items-center gap-4">
        <Image
          className="aspect-square rounded-full object-cover"
          src={pictureUrl || '/default-profile.png'}
          unoptimized
          alt="Profile picture"
          width={45}
          height={45}
        />
        <span className="flex flex-col">
          <div className="font-bold leading-5">{name}</div>
          <div className="text-xs">@{handle}</div>
        </span>
      </span>

      {isMember ? (
        <button
          className="cursor-pointer rounded-2xl bg-red-600 py-1 px-4 text-white shadow-md hover:bg-red-700"
          onClick={() =>
            onMemberChange(
              { id, name, pictureUrl, handle, isMember, onMemberChange },
              false,
            )
          }
        >
          Remove
        </button>
      ) : (
        <button
          className="cursor-pointer rounded-2xl bg-sky-600 py-1 px-4 text-white shadow-md hover:bg-sky-700"
          onClick={() =>
            onMemberChange(
              { id, name, pictureUrl, handle, isMember, onMemberChange },
              true,
            )
          }
        >
          Add
        </button>
      )}
    </div>
  );
}
