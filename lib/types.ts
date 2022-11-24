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
  coverPictureUrl?: string | null;
};

export type List = NewList & {
  id: string;
  createdAt: Date;
};

export type NewListMember = {
  profileId: string;
  listId: string;
};

export type ListMember = NewListMember & {
  id: string;
};

export type NewListFollower = {
  profileId: string;
  listId: string;
};

export type ListFollower = NewListFollower & {
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
