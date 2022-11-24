import type { NextApiRequest, NextApiResponse } from 'next';
import { countOwnedLists, getOwnedLists } from '@/lib/lenslists';
import {
  ErrorResponse,
  GetOwnedListsResponse,
  parseList,
} from '@/lib/responses.types';
import { ownedLists } from '@/lib/validations';
import { Pagination } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetOwnedListsResponse | ErrorResponse>,
) {
  if (!['GET'].includes(req.method as string)) {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    await ownedLists.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  const userId = req.query.userId as string;

  const pagination: Pagination = {};
  if (req.query.limit) {
    pagination.limit = Number(req.query.limit);
  }
  if (req.query.offset) {
    pagination.offset = Number(req.query.offset);
  }

  try {
    const [lists, listsCount] = await Promise.all([
      getOwnedLists(userId, pagination),
      countOwnedLists(userId),
    ]);

    const apiLists = lists.map((list) => parseList(list));

    const response = {
      data: {
        lists: {
          items: apiLists,
          pageInfo: {
            totalCount: listsCount,
          },
        },
      },
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}
