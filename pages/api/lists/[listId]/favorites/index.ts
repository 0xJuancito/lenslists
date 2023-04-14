import type { NextApiRequest, NextApiResponse } from 'next';
import { createListFavorite, getListById } from '@/lib/lenslists';
import { ErrorResponse } from '@/lib/responses.types';
import { listIdSchema, listFavoriteSchema } from '@/lib/validations';
import { getProfileId } from '@/lib/server/lens';
import { FavoriteResponse } from 'models/favoriteResponse';
import { verify } from '@/lib/server/verify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not found.' });
    }
    return addListFavoriteHandler(req, res);
  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}

async function addListFavoriteHandler(
  req: NextApiRequest,
  res: NextApiResponse<FavoriteResponse | ErrorResponse>,
) {
  try {
    await listIdSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  const listId = req.query.listId as string;

  let body: { profileId: string };
  try {
    body = req.body;
    await listFavoriteSchema.validateAsync(req.body);
  } catch (err: any) {
    const details = err.details || { message: 'Invalid JSON body.' };
    return res.status(422).json({ message: 'Validation error.', details });
  }

  let token;
  try {
    token = req.headers['x-access-token'] as string;
    const verifyResponse = await verify(token);
    if (!verifyResponse.data.verify) {
      throw new Error('Unauthorized');
    }
    const tokenProfileId = await getProfileId(token);
    if (body.profileId !== tokenProfileId) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  try {
    await createListFavorite({
      profileId: body.profileId,
      listId,
    });
  } catch (err: any) {
    // Do not throw any error if the user has already favorited the list
    if (!err?.constraint?.includes('unique')) {
      throw err;
    }
  }

  const response = {
    data: {
      favorite: true,
    },
  };

  res.status(200).json(response);
}
