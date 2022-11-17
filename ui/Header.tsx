'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div className="item flex h-16 w-full border-b bg-white">
      <div className="container mx-auto flex max-w-screen-xl px-4">
        <div className="flex items-center gap-3">
          <Image
            src="/lenslists.png"
            unoptimized
            alt="Lens Lists Logo"
            width={174}
            height={30}
          />
          {/* <span className="font-semibold text-zinc-800">Lens Lists</span> */}
        </div>
      </div>
    </div>
  );
}
