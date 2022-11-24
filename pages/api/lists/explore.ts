import type { NextApiRequest, NextApiResponse } from 'next';
import { getExploreLists, countExploreLists } from '@/lib/lenslists';
import { ErrorResponse, GetExploreListsResponse } from '@/lib/responses.types';
import { Pagination } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetExploreListsResponse | ErrorResponse>,
) {
  if (!['GET'].includes(req.method as string)) {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const pagination: Pagination = {};
  if (req.query.limit) {
    pagination.limit = Number(req.query.limit);
  }
  if (req.query.offset) {
    pagination.offset = Number(req.query.offset);
  }

  try {
    const [lists, listsCount] = await Promise.all([
      getExploreLists(pagination),
      countExploreLists(),
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
  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}
