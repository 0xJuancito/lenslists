'use client';

import Image from 'next/image';
import { useState } from 'react';

type IListUser = {
  pictureUrl: string;
  name: string;
  handle: string;
  isMember: boolean;
};

export default function UserListItem({
  pictureUrl,
  name,
  handle,
  isMember,
}: IListUser) {
  const [isMemberButton, setIsMemberButton] = useState(isMember);

  const toggleIsMember = () => {
    setIsMemberButton(!isMemberButton);
  };

  return (
    <div className="flex cursor-pointer items-center justify-between px-6 py-2 hover:bg-zinc-50">
      <span className="flex items-center gap-4">
        <Image
          className="rounded-full"
          src={pictureUrl}
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

      {isMemberButton ? (
        <button
          className="cursor-pointer rounded-2xl bg-red-600 py-1 px-4 text-white shadow-md hover:bg-red-700"
          onClick={() => toggleIsMember()}
        >
          Remove
        </button>
      ) : (
        <button
          className="cursor-pointer rounded-2xl bg-sky-700 py-1 px-4 text-white shadow-md hover:bg-sky-800"
          onClick={() => toggleIsMember()}
        >
          Add
        </button>
      )}
    </div>
  );
}
