import type { NextApiRequest, NextApiResponse } from 'next';
import { getExploreLists, countExploreLists } from '@/lib/lenslists';
import { ErrorResponse, parseList } from '@/lib/responses.types';
import { Pagination } from '@/lib/types';
import { ExploreListsResponse } from 'models/exploreListsResponse';

// /**
//  * @swagger
//  * /api/lists/explore:
//  *   get:
//  *     summary: Return a collection of recommended lists
//  *     tags: [Lists]
//  *     parameters:
//  *       - in: query
//  *         name: limit
//  *         required: false
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           maximum: 50
//  *         description: The number of items to be returned
//  *       - in: query
//  *         name: offset
//  *         required: false
//  *         schema:
//  *           type: integer
//  *           minimum: 0
//  *         description: The offset for the retrieved items to start from.
//  *     responses:
//  *       200:
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               $ref: '#/components/schemas/ExploreListsResponse'
//  */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExploreListsResponse | ErrorResponse>,
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

    const apiLists = lists.map(parseList);

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
