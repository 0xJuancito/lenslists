export default async function Head({ params }: { params: { slug: string } }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      <title>Lens Lists2</title>
      <meta
        name="description"
        content="Discover, create, and share awesome lists on Lens Protocol."
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lists.inlens.xyz/" />
      <meta property="og:title" content="Lens Lists" />
      <meta
        property="og:description"
        content="Discover, create, and share awesome lists on Lens Protocol."
      />
      <meta property="og:image" content="https://lists.inlens.xyz/og.jpg" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://lists.inlens.xyz/" />
      <meta property="twitter:title" content="Lens Lists" />
      <meta
        property="twitter:description"
        content="Discover, create, and share awesome lists on Lens Protocol."
      />
      <meta
        property="twitter:image"
        content="https://lists.inlens.xyz/og.jpg"
      />
    </>
  );
}
