import '@/styles/dist.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import Header from '@/ui/Header';
import LensProvider from '@/ui/LensProvider';
import { AnalyticsWrapper } from './components/analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;1,400;1,500&family=Space+Grotesk:wght@300;400;700&display=swap"
          rel="stylesheet"
        />

        <script
          defer
          data-domain="lists.inlens.xyz,lensverse.web"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className="font-space">
        <div className="flex h-full min-h-screen flex-col items-center text-zinc-600">
          <LensProvider>
            <Header></Header>
            <div className="container mx-auto flex max-w-screen-2xl px-4 pb-7 lg:px-4 xl:px-24">
              <div className="w-full">
                {children}
                <AnalyticsWrapper />
              </div>
            </div>
          </LensProvider>
        </div>
      </body>
    </html>
  );
}
