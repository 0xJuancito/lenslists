import type { NextApiRequest, NextApiResponse } from 'next';
import { createList, getListById } from '@/lib/lenslists';
import { ErrorResponse, ListResponse } from '@/lib/responses.types';
import { postListSchema } from '@/lib/validations';
import { NewList } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse | ErrorResponse>,
) {
  if (!['POST'].includes(req.method as string)) {
    return res.status(404).json({ message: 'Method not found.' });
  }

  let body: NewList;
  try {
    body = JSON.parse(req.body);
    await postListSchema.validateAsync(body);
  } catch (err: any) {
    const details = err.details || { message: 'Invalid JSON body.' };

    return res.status(422).json({ message: 'Validation error.', details });
  }

  const list = await createList(body);

  const response = {
    data: {
      list,
    },
  };

  res.status(200).json(response);
}
