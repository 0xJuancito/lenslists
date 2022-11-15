import type { NextApiRequest, NextApiResponse } from 'next';
import { getListById } from '@/lib/lenslists';
import { ErrorResponse, GetListResponse } from '@/lib/responses.types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetListResponse | ErrorResponse>,
) {
  if (!['GET'].includes(req.method as string)) {
    return res.status(404).json({ message: 'List not found.' });
  }

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

  res.status(200).json(response);
}
