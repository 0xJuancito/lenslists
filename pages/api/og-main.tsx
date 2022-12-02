import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

export default function () {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const baseUrl = isDevelopment
    ? 'http://localhost:3000'
    : 'https://lists.inlens.xyz';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img width="1200" height="630" src={`${baseUrl}/template.jpg`} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '160px',
            left: '370px',
            width: '460px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '20px 20px',
            borderRadius: '24px',
          }}
        >
          <img width="64" height="64" src={`${baseUrl}/lists.png`} />
          <span style={{ marginLeft: '20px', fontSize: 64 }}>LENS LISTS</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255,255,255,0.8)',
            position: 'absolute',
            bottom: '100px',
            left: '250px',
            borderRadius: '24px',
            width: '700px',
            fontSize: 42,
            padding: '30px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>Discover, Create, and Share</div>
          <div>Awesome Lists on Lens Protocol</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
