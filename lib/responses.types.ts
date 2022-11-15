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
