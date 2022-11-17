import '@/styles/dist.css';
import React from 'react';
import Header from '@/ui/Header';
import MainNav from '@/ui/MainNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Discover Lens</title>
      </head>
      <body>
        <div className="flex h-full min-h-screen flex-col bg-zinc-100 text-zinc-600">
          <Header></Header>
          <div className="container mx-auto flex max-w-screen-xl py-7">
            <div className="flex gap-10 px-3">
              {/* FIXME */}
              <div
                className="flex w-64 grow-0 flex-col"
                style={{ minWidth: '16rem' }}
              >
                <MainNav></MainNav>
              </div>
              <div className="grow">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
