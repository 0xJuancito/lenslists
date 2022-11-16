import type { NextApiRequest, NextApiResponse } from 'next';
import { createList } from '@/lib/lenslists';
import { ErrorResponse, ListResponse } from '@/lib/responses.types';
import { upsertListSchema } from '@/lib/validations';
import { getProfileId } from '@/lib/lens';
import { NewList } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse | ErrorResponse>,
) {
  if (!['POST'].includes(req.method as string)) {
    return res.status(404).json({ message: 'Endpoint not found.' });
  }

  const token = req.headers['x-access-token'] as string;
  let profileId;
  try {
    profileId = await getProfileId(token);
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  let body: NewList;
  try {
    body = JSON.parse(req.body);
    await upsertListSchema.validateAsync(body);
    body.ownedBy = profileId;
  } catch (err: any) {
    const details = err.details || { message: 'Invalid JSON body.' };

    return res.status(422).json({ message: 'Validation error.', details });
  }

  try {
    const list = await createList(body);

    const response = {
      data: {
        list,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}
