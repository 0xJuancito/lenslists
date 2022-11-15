import type { NextApiRequest, NextApiResponse } from 'next';
import { getListById, updateList } from '@/lib/lenslists';
import { ErrorResponse, ListResponse } from '@/lib/responses.types';
import { listIdSchema, upsertListSchema } from '@/lib/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse | ErrorResponse>,
) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method as string)) {
    return res.status(404).json({ message: 'Endpoint not found.' });
  }

  try {
    await listIdSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  const listId = req.query.listId as string;

  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}
