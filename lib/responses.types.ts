import { List as DbList } from '@/lib/types';
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
    totalFavorites: Number(list.totalFavorites),
  },
});

export type ErrorResponse = {
  message: string;
  details?: object;
};
