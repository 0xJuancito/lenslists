import type { NextApiRequest, NextApiResponse } from 'next';
import {
  countListMembers,
  createListMember,
  getListMembers,
} from '@/lib/lenslists';
import {
  ErrorResponse,
  GetListMembersResponse,
  MemberResponse,
} from '@/lib/responses.types';
import { listIdSchema, newListMemberSchema } from '@/lib/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await listIdSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

  try {
    if (req.method === 'GET') {
      await getListMembersHandler(req, res);
    } else if (req.method === 'POST') {
      await addListMemberHandler(req, res);
    } else {
      return res.status(404).json({ message: 'Method not found.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'There was an unexpected error. Please try again later.',
    });
  }
}

async function getListMembersHandler(
  req: NextApiRequest,
  res: NextApiResponse<GetListMembersResponse | ErrorResponse>,
) {
  const listId = req.query.listId as string;

  const [members, membersCount] = await Promise.all([
    getListMembers(listId),
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
          totalCount: membersCount,
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
  const listId = req.query.listId as string;

  let body: { profileId: string };
  try {
    body = JSON.parse(req.body);
    await newListMemberSchema.validateAsync(body);
  } catch (err: any) {
    const details = err.details || { message: 'Invalid JSON body.' };
    return res.status(422).json({ message: 'Validation error.', details });
  }

  try {
    const listMember = await createListMember({
      profileId: body.profileId,
      listId,
    });
  } catch (err: any) {
    // Do not throw any error if the user is already member of the list
    if (!err.constraint.includes('unique')) {
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
