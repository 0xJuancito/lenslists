import type { NextApiRequest, NextApiResponse } from 'next';
import ImageKit from 'imagekit';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  console.log(123);
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL as string,
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();

  res.status(200).json(authenticationParameters);
}
