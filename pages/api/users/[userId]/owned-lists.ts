import type { NextApiRequest, NextApiResponse } from 'next';
import { countOwnedLists, getOwnedLists } from '@/lib/lenslists';
import { ErrorResponse, GetOwnedListsResponse } from '@/lib/responses.types';
import { getOwnedListsSchema } from '@/lib/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetOwnedListsResponse | ErrorResponse>,
) {
  if (!['GET'].includes(req.method as string)) {
    return res.status(404).json({ message: 'Lists not found.' });
  }

  try {
    await getOwnedListsSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  const userId = req.query.userId as string;

  const [lists, listsCount] = await Promise.all([
    getOwnedLists(userId),
    countOwnedLists(userId),
  ]);

  const response = {
    data: {
      lists: {
        items: lists,
        pageInfo: {
          totalCount: listsCount,
        },
      },
    },
  };

  res.status(200).json(response);
}
