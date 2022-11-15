import { List } from '@/lib/types';

export type ErrorResponse = {
  message: string;
};

export type GetListResponse = {
  data: {
    list: List;
  };
};
