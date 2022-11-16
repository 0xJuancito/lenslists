'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <span className="flex h-20 bg-white">
        <div className="container mx-auto flex max-w-screen-xl px-4">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-xl bg-zinc-100"
              src="/lenslists.png"
              unoptimized
              alt="Lens Lists Logo"
              width={220}
              height={38}
            />
            {/* <span className="font-semibold text-zinc-800">Lens Lists</span> */}
          </div>
        </div>
      </span>
    </div>
  );
}
