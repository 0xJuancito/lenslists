'use client';

import LoginButton from '@/ui/LoginButton';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="item flex h-16 w-full border-b bg-white">
      <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-4">
        <Link href="/">
          <div>
            <Image
              src="/lenslists.png"
              unoptimized
              alt="Lens Lists Logo"
              width={174}
              height={30}
            />
          </div>
        </Link>
        <LoginButton></LoginButton>
      </div>
    </div>
  );
}
