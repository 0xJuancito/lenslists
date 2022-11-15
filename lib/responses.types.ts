import { List } from '@/lib/types';

export type ErrorResponse = {
  message: string;
  details?: object;
};

export type GetListResponse = {
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
