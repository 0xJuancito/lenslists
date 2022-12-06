import { ListResponse } from 'models/listResponse';

export default async function Head({ params }: { params: { listId: string } }) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const baseUrl = isDevelopment
    ? 'http://localhost:3000'
    : 'https://lists.inlens.xyz';

  const ogUrl = `${baseUrl}/lists/${params.listId}`;
  let ogImageUrl = `${baseUrl}/api/og-list`;

  let title = 'Lens Lists';
  let description =
    'Discover, create, and share awesome lists on Lens Protocol.';

  try {
    const rawResponse = await fetch(`${baseUrl}/api/lists/${params.listId}`);
    const response = (await rawResponse.json()) as ListResponse;
    const list = response.data.list;
    title = `${list.name} - Lens Lists`;
    description = list.description;
    const handle = list.ownerProfile.handle.replace('.lens', '');

    const buffer = Buffer.from(
      JSON.stringify({
        title: list.name,
        handle: handle,
        image: list.coverPictureUrl,
      }),
    ).toString('base64');

    ogImageUrl = `${ogImageUrl}/${buffer}`;
  } catch (err) {}

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
