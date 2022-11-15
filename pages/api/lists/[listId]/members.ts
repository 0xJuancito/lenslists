import type { NextApiRequest, NextApiResponse } from 'next';
import { countListMembers, getListMembers } from '@/lib/lenslists';
import { ErrorResponse, GetListMembersResponse } from '@/lib/responses.types';
import { getListMembersSchema } from '@/lib/validations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetListMembersResponse | ErrorResponse>,
) {
  if (!['GET'].includes(req.method as string)) {
    return res.status(404).json({ message: 'Members not found.' });
  }

  try {
    await getListMembersSchema.validateAsync(req.query);
  } catch (err: any) {
    return res
      .status(422)
      .json({ message: 'Validation error.', details: err.details });
  }

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
