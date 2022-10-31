import '@/styles/dist.css';
import '@/styles/globals.css';
import React from 'react';
import AddressBar from '@/ui/AddressBar';
import GlobalNav from './GlobalNav';
import Header from '@/ui/Header';

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
        <Header></Header>
      </body>
    </html>
  );
}
