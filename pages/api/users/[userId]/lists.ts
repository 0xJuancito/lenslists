import type { NextApiRequest, NextApiResponse } from 'next';
import { countOwnedLists, getOwnedLists } from '@/lib/lenslists';
import { ErrorResponse, parseList } from '@/lib/responses.types';
import { ownedLists } from '@/lib/validations';
import { Pagination } from '@/lib/types';
import { UserListsResponse } from 'models/userListsResponse';

/**
 * @swagger
 * /api/users/{profileId}/lists:
 *   get:
 *     summary: Return a collection of lists owned by the user
 *     tags: [List]
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Lens Protocol profile id of the user
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: The number of items to be returned
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: The offset for the retrieved items to start from
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/UserListsResponse'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserListsResponse | ErrorResponse>,
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
