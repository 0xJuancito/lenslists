import type { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteList,
  getListById,
  isFavoriteList,
  updateList,
} from '@/lib/lenslists';
import { ErrorResponse, parseList } from '@/lib/responses.types';
import {
  listIdSchema,
  profileIdSchema,
  upsertListSchema,
} from '@/lib/validations';
import { getProfileId } from '@/lib/server/lens';
import { ListResponse } from 'models/listResponse';
import { DeleteResponse } from 'models/deleteResponse';
import { List } from '@/lib/types';

/**
 * @swagger
 * /api/lists/{listId}:
 *   parameters:
 *     - in: path
 *       name: listId
 *       required: true
 *       schema:
 *         type: string
 *       description: The id of the list
 *   get:
 *     summary: Return the information of a specific list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ListResponse'
 *   put:
 *     security:
 *       - apiKey:
 *         -
 *     summary: Update a list
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
 *   delete:
 *     security:
 *       - apiKey:
 *         -
 *     summary: Delete a list
 *     tags: [Lists]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/DeleteResponse'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await listIdSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  try {
    if (req.method === 'GET') {
      await getListHandler(req, res);
    } else if (req.method === 'PUT') {
      await updateListHandler(req, res);
    } else if (req.method === 'DELETE') {
      await deleteListHandler(req, res);
    } else {
      return res.status(405).json({ message: 'Method not found.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}

async function getListHandler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse | ErrorResponse>,
) {
  const listId = req.query.listId as string;

  const list = await getListById(listId);

  if (!list) {
    return res.status(404).json({ message: 'List not found.' });
  }

  const profileId = req.query.profileId as string;
  if (profileId) {
    await profileIdSchema.validateAsync(profileId);
    const favorite = await isFavoriteList(listId, profileId);
    list.favorite = favorite;
  }

  const apiList = parseList(list);

  const response = {
    data: {
      list: apiList,
    },
  };

  return res.status(200).json(response);
}

async function updateListHandler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse | ErrorResponse>,
) {
  const listId = req.query.listId as string;
  let list = await getListById(listId);

  if (!list) {
    return res.status(404).json({ message: 'List not found.' });
  }

  try {
    const token = req.headers['x-access-token'] as string;
    const ownerId = await getProfileId(token);
    if (list.ownedByProfileId !== ownerId) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  let body;
  try {
    body = req.body;
    await upsertListSchema.validateAsync(body);
  } catch (err: any) {
    const details = err.details || { message: 'Invalid JSON body.' };
    return res.status(422).json({ message: 'Validation error.', details });
  }
  const apiList = parseList(await updateList(listId, body));

  const response = {
    data: {
      list: apiList,
    },
  };

  return res.status(200).json(response);
}

async function deleteListHandler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse | ErrorResponse>,
) {
  const listId = req.query.listId as string;

  let list = await getListById(listId);

  if (!list) {
    return res.status(404).json({ message: 'List not found.' });
  }

  try {
    const token = req.headers['x-access-token'] as string;
    const ownerId = await getProfileId(token);
    if (list.ownedByProfileId !== ownerId) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  await deleteList(listId);

  const response = {
    data: {
      deleted: true,
    },
  };

  return res.status(200).json(response);
}
