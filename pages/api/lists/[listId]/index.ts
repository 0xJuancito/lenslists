import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteList, getListById, updateList } from '@/lib/lenslists';
import {
  DeleteResponse,
  ErrorResponse,
  ListResponse,
} from '@/lib/responses.types';
import { listIdSchema, upsertListSchema } from '@/lib/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse | ErrorResponse>,
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
      return res.status(404).json({ message: 'Method not found.' });
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

  const response = {
    data: {
      list,
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

  if (req.method === 'PUT') {
    let body;
    try {
      body = JSON.parse(req.body);
      await upsertListSchema.validateAsync(body);
    } catch (err: any) {
      const details = err.details || { message: 'Invalid JSON body.' };
      return res.status(422).json({ message: 'Validation error.', details });
    }
    list = await updateList(listId, body);
  }

  const response = {
    data: {
      list,
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

  await deleteList(listId);

  const response = {
    data: {
      deleted: true,
    },
  };

  return res.status(200).json(response);
}
