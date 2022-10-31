'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <span className="flex items-center">
        <Image
          src="/logo.svg"
          unoptimized
          alt="Lenscover Logo"
          width={40}
          height={40}
        />
        <span>Lenscover</span>
      </span>
    </div>
  );
}
