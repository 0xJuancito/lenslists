export type UpdateList = {
  name?: string;
  description?: string;
  coverPictureUrl?: string;
};

export type NewList = {
  name: string;
  description: string;
  ownedByProfileId: string;
  ownedByHandle: string;
  coverPictureUrl: string;
};

export type List = NewList & {
  id: string;
  createdAt: Date;
  totalMembers: number;
  totalFavorites: number;
};

export type NewListMember = {
  profileId: string;
  listId: string;
};

export type ListMember = NewListMember & {
  id: string;
};

export type NewListFavorite = {
  profileId: string;
  listId: string;
};

export type ListFavorite = NewListFavorite & {
  id: string;
};

export type NewListPinned = {
  profileId: string;
  listId: string;
};

export type ListPinned = NewListPinned & {
  id: string;
};

export interface Pagination {
  limit?: number;
  offset?: number;
}
