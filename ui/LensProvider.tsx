'use client';

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import LensAuthenticationProvider from './LensAuthenticationProvider';
import { LensAvatar } from './LensAvatar';

const { chains, provider } = configureChains(
  [chain.polygon],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'Lens Lists',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function LensProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig client={wagmiClient}>
      <LensAuthenticationProvider>
        <RainbowKitProvider chains={chains} avatar={LensAvatar}>
          {children}
        </RainbowKitProvider>
      </LensAuthenticationProvider>
    </WagmiConfig>
  );
}
