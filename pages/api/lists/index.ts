import type { NextApiRequest, NextApiResponse } from 'next';
import { countOwnedLists, createList } from '@/lib/lenslists';
import { ErrorResponse, parseList } from '@/lib/responses.types';
import {
  maxListsCount,
  MAX_LISTS_COUNT,
  upsertListSchema,
} from '@/lib/validations';
import { getProfile, getProfileId } from '@/lib/server/lens';
import { NewList } from '@/lib/types';
import { ListResponse } from 'models/listResponse';

/**
 * @swagger
 * /api/lists:
 *   post:
 *     security:
 *       - apiKey:
 *         -
 *     summary: Create a new list
 *     description: Create a new list owned by the user. The current limit is 10 lists per user
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/UpsertList'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ListResponse'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse | ErrorResponse>,
) {
  if (!['POST'].includes(req.method as string)) {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const token = req.headers['x-access-token'] as string;
  let profileId;
  let handle;
  try {
    const profile = await getProfile(token);
    profileId = profile.id;
    handle = profile.handle;
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  let body: NewList;
  try {
    body = req.body;
    await upsertListSchema.validateAsync(body);
    body.ownedByProfileId = profileId;
    body.ownedByHandle = handle;
  } catch (err: any) {
    const details = err.details || { message: 'Invalid JSON body.' };

    return res.status(422).json({ message: 'Validation error.', details });
  }

  try {
    const count = await countOwnedLists(profileId);
    await maxListsCount.validateAsync(count);
  } catch (err) {
    return res.status(409).json({
      message: `You can't create more than ${MAX_LISTS_COUNT} lists at the moment.`,
    });
  }

  try {
    const list = parseList(await createList(body));

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
