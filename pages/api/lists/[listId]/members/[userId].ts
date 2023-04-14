import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteListMember, getListById } from '@/lib/lenslists';
import { ErrorResponse } from '@/lib/responses.types';
import { listIdMemberIdSchema } from '@/lib/validations';
import { getProfileId } from '@/lib/server/lens';
import { DeleteResponse } from 'models/deleteResponse';
import { verify } from '@/lib/server/verify';

/**
 * @swagger
 * /api/lists/{listId}/members/{profileId}:
 *   delete:
 *     security:
 *       - apiKey:
 *         -
 *     summary: Remove a user from a list
 *     tags: [List Members]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the list
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Lens Protocol profile id of the user
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/DeleteResponse'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse | ErrorResponse>,
) {
  if (!['DELETE'].includes(req.method as string)) {
    return res.status(405).json({ message: 'Method not allowed.' });
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

    try {
      const token = req.headers['x-access-token'] as string;
      const verifyResponse = await verify(token);
      if (!verifyResponse.data.verify) {
        throw new Error('Unauthorized');
      }
      const ownerId = await getProfileId(token);
      if (list.ownedByProfileId !== ownerId) {
        return res.status(403).json({ message: 'Unauthorized.' });
      }
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: 'Unauthorized.' });
    }

    await deleteListMember(listId, profileId);

    const response = {
      data: {
        deleted: true,
      },
    };

    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}
