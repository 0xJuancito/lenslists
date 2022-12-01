import { NewListMember, List as DbList } from '@/lib/types';
import { List as ApiList } from 'models/list';

export const parseList = (list: DbList): ApiList => ({
  name: list.name,
  description: list.description,
  coverPictureUrl: list.coverPictureUrl,
  id: list.id,
  createdAt: list.createdAt,
  ownerProfile: {
    id: list.ownedByProfileId,
    handle: list.ownedByHandle,
  },
  stats: {
    totalMembers: Number(list.totalMembers),
    totalFollowers: Number(list.totalFollowers),
  },
});

export type ErrorResponse = {
  message: string;
  details?: object;
};

export type MemberResponse = {
  data: {
    member: NewListMember;
  };
};
