import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteListMember, getListById } from '@/lib/lenslists';
import {
  DeleteResponse,
  ErrorResponse,
  ListResponse,
} from '@/lib/responses.types';
import { listIdMemberIdSchema } from '@/lib/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse | ErrorResponse>,
) {
  if (!['DELETE'].includes(req.method as string)) {
    return res.status(404).json({ message: 'Endpoint not found.' });
  }

  try {
    await listIdMemberIdSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  try {
    const listId = req.query.listId as string;
    const profileId = req.query.userId as string;

    let list = await getListById(listId);

    if (!list) {
      return res.status(404).json({ message: 'List not found.' });
    }

    await deleteListMember(listId, profileId);

    const response = {
      data: {
        deleted: true,
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
