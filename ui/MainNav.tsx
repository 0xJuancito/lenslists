'use client';

import { HomeIcon, MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';

type TIcon = typeof HomeIcon;

export default function MainNav() {
  const navItem = (title: string, Icon: TIcon, last = false) => {
    const border = 'border-b border-solid border-zinc-100';

    return (
      <div
        className={`flex h-14 cursor-pointer items-center gap-3 rounded-xl px-2 hover:bg-zinc-50 ${
          last ? '' : border
        }`}
      >
        <Icon className="h-6 w-6" />
        <div>{title}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col rounded-xl bg-white px-6 py-6 text-sm font-semibold">
      {navItem('Home', HomeIcon)}
      {navItem('Discover', MapIcon)}
      {navItem('My Lists', ListBulletIcon, true)}
    </div>
  );
}
