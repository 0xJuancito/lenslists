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

export type Member = {
  profileId: string;
};

export type ErrorResponse = {
  message: string;
  details?: object;
};

export type ListResponse = {
  data: {
    list: ApiList;
  };
};

export type GetListMembersResponse = {
  data: {
    members: {
      items: Member[];
      pageInfo: {
        totalCount: number;
      };
    };
  };
};

export type DeleteResponse = {
  data: {
    deleted: boolean;
  };
};

export type MemberResponse = {
  data: {
    member: NewListMember;
  };
};
