'use client';

import Image from 'next/image';

export default function LoginButton() {
  return (
    <button className="flex cursor-pointer items-center gap-2 rounded-2xl bg-lens-lime px-4 py-2 text-black shadow-md hover:bg-lens-lime-hover">
      <Image
        src="/lens.png"
        className=""
        unoptimized
        alt="Lens Logo"
        width={18}
        height={18}
      />
      <span>LOGIN</span>
    </button>
  );
}
