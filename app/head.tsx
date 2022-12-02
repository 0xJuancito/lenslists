export default function Head() {
  const title = 'Lens Lists';
  const description =
    'Discover, create, and share awesome lists on Lens Protocol.';

  const ogUrl = 'https://lists.inlens.xyz/';
  const ogImageUrl = 'https://lists.inlens.xyz/og.png';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageUrl} />
    </>
  );
}
