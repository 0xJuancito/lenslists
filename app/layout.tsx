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
        <div className="flex h-screen flex-col bg-zinc-100 text-zinc-600">
          <Header></Header>
          <div className="container mx-auto flex max-w-screen-xl grow pt-7">
            <div className="flex grow gap-10 px-3">
              <div
                className="flex w-64 flex-col"
                style={{ width: '241px !important' }}
              >
                <MainNav></MainNav>
              </div>
              <div className="grow bg-blue-600">Content</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
