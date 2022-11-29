'use client';

import ListModal from '@/ui/ListModal';
import LoginButton from '@/ui/LoginButton';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ProfileContext } from './LensAuthenticationProvider';

export default function Header() {
  const [showListModal, setShowListModal] = useState(false);

  const profile = useContext(ProfileContext);

  const { openConnectModal } = useConnectModal();

  const openCreateListModal = () => {
    if (openConnectModal) {
      openConnectModal();
    } else {
      setShowListModal(true);
    }
  };

  return (
    <div className="item flex h-16 w-full border-b bg-white">
      <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-4">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/lists.png"
              unoptimized
              alt="Lens Lists Logo"
              width={40}
              height={40}
            />
            <span className="hidden text-3xl font-bold text-black lg:flex">
              LENS LISTS
            </span>
          </div>
        </Link>
        <div className="flex gap-4 sm:gap-8">
          {profile?.id && (
            <Link
              href={`/users/${profile.id}/lists`}
              className="flex items-center"
            >
              <div className="flex cursor-pointer text-lg font-bold text-black">
                MY LISTS
              </div>
            </Link>
          )}
          <button
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-sky-600 px-4 py-2 text-white shadow-md hover:bg-sky-700"
            onClick={() => openCreateListModal()}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 fill-white font-bold"
            >
              <g>
                <path d="M5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5H12v2H5.5C4.12 22 3 20.88 3 19.5v-15C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5V13h-2V4.5c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2zm10 7v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path>
              </g>
            </svg>
            <span className="hidden sm:flex">CREATE LIST</span>
          </button>
          {showListModal && (
            <ListModal
              close={() => {
                setShowListModal(false);
              }}
            ></ListModal>
          )}
          <LoginButton></LoginButton>
        </div>
      </div>
    </div>
  );
}
