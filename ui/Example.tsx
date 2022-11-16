'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <span className="flex items-center">
        <Image
          src="/logo.svg"
          unoptimized
          alt="Lens Lists Logo"
          width={40}
          height={40}
        />
        <span>Lens Lists</span>
      </span>
    </div>
  );
}
