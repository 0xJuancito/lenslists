import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default function (req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const buffer = Buffer.from(searchParams.get('data') || '', 'base64');
    const { handle, title, image } = JSON.parse(buffer.toString());

    if (!handle || !title || !image) {
      throw new Error();
    }

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
          <img
            width="800"
            height="450"
            src={image}
            style={{
              position: 'absolute',
              top: '90px',
              left: '200px',
              borderRadius: '24px',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              padding: '15px 0',
              width: '800px',
              bottom: '90px',
              left: '200px',
              borderRadius: '0 0 24px 24px',
            }}
          >
            <div style={{ textTransform: 'uppercase', fontSize: 48 }}>
              {title}
            </div>
            <div style={{ fontSize: 32, display: 'flex' }}>
              by @{handle}.lens
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#ffffff',
              padding: '5px 10px',
              borderRadius: '10px',
            }}
          >
            <img width="32" height="32" src={`${baseUrl}/lists.png`} />
            <span style={{ marginLeft: '10px', fontSize: 32 }}>LENS LISTS</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(e);
    return new Response(e.message, {
      status: 500,
    });

    // return new Response(`Failed to generate the image`, {
    //   status: 500,
    // });
  }
}
