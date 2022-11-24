import { List, NewListMember } from '@/lib/types';

export type Member = {
  profileId: string;
};

export type ErrorResponse = {
  message: string;
  details?: object;
};

export type ListResponse = {
  data: {
    list: List;
  };
};

export type GetOwnedListsResponse = {
  data: {
    lists: {
      items: List[];
      pageInfo: {
        totalCount: number;
      };
    };
  };
};

export type GetExploreListsResponse = {
  data: {
    lists: {
      items: List[];
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
