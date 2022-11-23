'use client';

import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext, useEffect } from 'react';
import { ProfileContext } from './LensAuthenticationProvider';

export default function LoginButton() {
  const profile = useContext(ProfileContext);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0.5,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="flex cursor-pointer items-center gap-2 rounded-2xl 
                    bg-lens-lime px-4 py-2 text-black shadow-md hover:bg-lens-lime-hover"
                    onClick={openConnectModal}
                    type="button"
                  >
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

              const loggedButton = (onClick: () => void) => (
                <button
                  className="flex cursor-pointer items-center gap-2 rounded-2xl bg-lens-lime px-4 py-2 font-bold text-black shadow-md hover:bg-lens-lime-hover"
                  onClick={onClick}
                >
                  <Image
                    src={profile?.pictureUrl || '/default-profile.png'}
                    className="rounded-full"
                    unoptimized
                    alt="Profile"
                    width={26}
                    height={26}
                  />
                  <span>{profile?.handle}</span>
                </button>
              );

              if (chain.unsupported) {
                return loggedButton(openChainModal);
              }

              return loggedButton(openAccountModal);
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
