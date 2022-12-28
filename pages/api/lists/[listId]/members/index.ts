import type { NextApiRequest, NextApiResponse } from 'next';
import {
  countListMembers,
  createListMember,
  getListById,
  getListMembers,
} from '@/lib/lenslists';
import { ErrorResponse } from '@/lib/responses.types';
import {
  listIdSchema,
  listMembers,
  maxMembersCount,
  MAX_MEMBERS_COUNT,
  newListMemberSchema,
} from '@/lib/validations';
import { getProfile, getProfileId } from '@/lib/server/lens';
import { Pagination } from '@/lib/types';
import { MembersResponse } from 'models/membersResponse';
import { MemberResponse } from 'models/memberResponse';

/**
 * @swagger
 * /api/lists/{listId}/members:
 *   parameters:
 *     - in: path
 *       name: listId
 *       required: true
 *       schema:
 *         type: string
 *       description: The id of the list
 *   get:
 *     summary: Return the members of a specific list
 *     tags: [List Members]
 *     parameters:
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
 *         description: The offset for the retrieved items to start from.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/MembersResponse'
 *   post:
 *     security:
 *       - apiKey:
 *         -
 *     summary: Add a user to a list
 *     description: Add a user to an specified list. The current limit is 150 users per list.
 *     tags: [List Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/MemberResponse'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      await getListMembersHandler(req, res);
    } else if (req.method === 'POST') {
      await addListMemberHandler(req, res);
    } else {
      return res.status(405).json({ message: 'Method not found.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}

async function getListMembersHandler(
  req: NextApiRequest,
  res: NextApiResponse<MembersResponse | ErrorResponse>,
) {
  try {
    await listMembers.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  const listId = req.query.listId as string;

  const pagination: Pagination = {};
  if (req.query.limit) {
    pagination.limit = Number(req.query.limit);
  }
  if (req.query.offset) {
    pagination.offset = Number(req.query.offset);
  }

  const [members, totalMembers] = await Promise.all([
    getListMembers(listId, pagination),
    countListMembers(listId),
  ]);

  const parsedMembers = members.map((member) => ({
    profileId: member.profileId,
  }));

  const response = {
    data: {
      members: {
        items: parsedMembers,
        pageInfo: {
          totalCount: totalMembers,
        },
      },
    },
  };

  res.status(200).json(response);
}

async function addListMemberHandler(
  req: NextApiRequest,
  res: NextApiResponse<MemberResponse | ErrorResponse>,
) {
  try {
    await listIdSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  const listId = req.query.listId as string;

  let body: { profileId: string };
  try {
    body = req.body;
    await newListMemberSchema.validateAsync(req.body);
  } catch (err: any) {
    const details = err.details || { message: 'Invalid JSON body.' };
    return res.status(422).json({ message: 'Validation error.', details });
  }

  let token;
  try {
    token = req.headers['x-access-token'] as string;
    const ownerId = await getProfileId(token);
    const list = await getListById(listId);
    if (list?.ownedByProfileId !== ownerId) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  try {
    const count = await countListMembers(listId);
    await maxMembersCount.validateAsync(count);
  } catch (err) {
    return res.status(409).json({
      message: `You can't add more than ${MAX_MEMBERS_COUNT} memmbers to a list at the moment.`,
    });
  }

  try {
    const profile = await getProfile(token, body.profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile does not exist.' });
    }
    await createListMember({
      profileId: body.profileId,
      listId,
    });
  } catch (err: any) {
    // Do not throw any error if the user is already member of the list
    if (!err?.constraint?.includes('unique')) {
      throw err;
    }
  }

  const response = {
    data: {
      member: {
        listId: listId,
        profileId: body.profileId,
      },
    },
  };

  res.status(200).json(response);
}
