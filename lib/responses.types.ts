import { NewListMember, List as DbList } from '@/lib/types';

export const parseList = (list: DbList): ApiList => ({
  name: list.name,
  description: list.description,
  coverPictureUrl: list.coverPictureUrl,
  id: list.id,
  createdAt: list.createdAt,
  ownedBy: {
    handle: list.ownedByHandle,
    profileId: list.ownedByProfileId,
  },
  stats: {
    totalMembers: Number(list.totalMembers),
    totalFollowers: Number(list.totalFollowers),
  },
});

export type ApiList = {
  name: string;
  description: string;
  coverPictureUrl?: string | null;
  id: string;
  createdAt: Date;
  ownedBy: {
    handle: string;
    profileId: string;
  };
  stats: {
    totalMembers: number;
    totalFollowers: number;
  };
};

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

export type GetOwnedListsResponse = {
  data: {
    lists: {
      items: ApiList[];
      pageInfo: {
        totalCount: number;
      };
    };
  };
};

export type GetExploreListsResponse = {
  data: {
    lists: {
      items: ApiList[];
      pageInfo: {
        totalCount: number;
      };
    };
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
