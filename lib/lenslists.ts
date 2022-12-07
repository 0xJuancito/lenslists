import knex, { Knex } from 'knex';
import {
  List,
  NewList,
  ListMember,
  ListFavorite,
  NewListMember,
  NewListFavorite,
  Pagination,
  UpdateList,
  ListPinned,
  NewListPinned,
} from './types';

const config: Knex.Config = {
  client: 'pg',
  version: '7.2',
  connection: process.env.DB_URL,
};

export const knexInstance = knex(config);

// Lists
export const getExploreLists = (pagination?: Pagination): Promise<List[]> => {
  const limit = pagination?.limit || 50;
  const offset = pagination?.offset || 0;

  let query = knexInstance<List>('lists')
    .select('lists.*')
    .select(knexInstance.raw('COUNT("listMembers".id) AS "totalMembers"'))
    .select(knexInstance.raw('COUNT("listFavorites".id) AS "totalFavorites"'))
    .leftJoin('listMembers', 'listMembers.listId', 'lists.id')
    .leftJoin('listFavorites', 'listFavorites.listId', 'lists.id')
    .groupBy('lists.id')
    .where(knexInstance.raw(`"lists".name NOT ILIKE '%test%'`))
    .having(knexInstance.raw('COUNT("listMembers".id) > 0'))
    .orderByRaw(knexInstance.raw('COUNT("listFavorites".id) DESC'))
    .orderBy('lists.score', 'desc')
    .orderBy('lists.id', 'desc')
    .limit(limit)
    .offset(offset);

  return query;
};

export const countExploreLists = async (): Promise<number> => {
  let query = knexInstance<List>('lists')
    .count<Record<string, number>>('*')
    .first();

  const result = await query;
  return result?.count ? Number(result?.count) : 0;
};

export const getListById = async (listId: string): Promise<List | null> => {
  const list = await knexInstance<List>('lists')
    .select('lists.*')
    .select(knexInstance.raw('COUNT("listMembers".id) AS "totalMembers"'))
    .select(knexInstance.raw('COUNT("listFavorites".id) AS "totalFavorites"'))
    .leftJoin('listMembers', 'listMembers.listId', 'lists.id')
    .leftJoin('listFavorites', 'listFavorites.listId', 'lists.id')
    .groupBy('lists.id')
    .where({ 'lists.id': listId })
    .first();
  return list || null;
};

export const getOwnedLists = (
  profileId: string,
  pagination?: Pagination,
): Promise<List[]> => {
  const limit = pagination?.limit || 50;
  const offset = pagination?.offset || 0;

  let query = knexInstance<List>('lists')
    .select('lists.*')
    .select(knexInstance.raw('COUNT("listMembers".id) AS "totalMembers"'))
    .select(knexInstance.raw('COUNT("listFavorites".id) AS "totalFavorites"'))
    .leftJoin('listMembers', 'listMembers.listId', 'lists.id')
    .leftJoin('listFavorites', 'listFavorites.listId', 'lists.id')
    .groupBy('lists.id')
    .orderBy('lists.id', 'desc')
    .where({ ownedByProfileId: profileId })
    .limit(limit)
    .offset(offset);

  return query;
};

export const countOwnedLists = async (profileId: string): Promise<number> => {
  let query = knexInstance<List>('lists')
    .count<Record<string, number>>('*')
    .where({ ownedByProfileId: profileId })
    .first();

  const result = await query;
  return result?.count ? Number(result?.count) : 0;
};

export const createList = async (newList: NewList): Promise<List> => {
  const lists = await knexInstance<List>('lists')
    .insert(newList)
    .returning('*');
  return lists[0];
};

export const updateList = async (
  listId: string,
  data: UpdateList,
): Promise<List> => {
  const lists = await knexInstance<List>('lists')
    .where({ id: listId })
    .update(data)
    .returning('*');

  return lists[0];
};

export const deleteList = async (listId: string): Promise<void> => {
  await knexInstance.transaction(async (tx) => {
    await tx<ListPinned>('listPinned').delete().where({ listId });
    await tx<ListMember>('listMembers').delete().where({ listId });
    await tx<ListFavorite>('listFavorites').delete().where({ listId });
    await tx<List>('lists').delete().where({ id: listId });
  });
};

// List Members
export const getListMembers = (
  listId: string,
  pagination?: Pagination,
): Promise<ListMember[]> => {
  const limit = pagination?.limit || 50;
  const offset = pagination?.offset || 0;

  const query = knexInstance<ListMember>('listMembers')
    .select('*')
    .where({ listId })
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

  return query;
};

export const countListMembers = async (listId: string): Promise<number> => {
  let query = knexInstance<ListMember>('listMembers')
    .count<Record<string, number>>('*')
    .where({ listId })
    .first();

  const result = await query;
  return result?.count ? Number(result?.count) : 0;
};

export const getListMemberships = (
  profileId: string,
  pagination?: Pagination,
): Promise<List[]> => {
  const limit = pagination?.limit || 50;
  const offset = pagination?.offset || 0;

  const query = knexInstance<List>('lists')
    .select('lists.*')
    .leftJoin('listMembers', 'lists.id', 'listMembers.listId')
    .where({ 'listMembers.profileId': profileId })
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

  return query;
};

export const countListMemberships = async (
  profileId: string,
): Promise<number> => {
  const query = knexInstance<List>('lists')
    .count<Record<string, number>>('lists.*')
    .leftJoin('listMembers', 'lists.id', 'listMembers.listId')
    .where({ 'listMembers.profileId': profileId });

  const result = await query;
  return result?.count ? Number(result?.count) : 0;
};

export const createListMember = async (
  newListMember: NewListMember,
): Promise<ListMember> => {
  const listMembers = await knexInstance<ListMember>('listMembers')
    .insert(newListMember)
    .returning('*');
  return listMembers[0];
};

export const deleteListMember = async (
  listId: string,
  profileId: string,
): Promise<void> => {
  await knexInstance<ListMember>('listMembers')
    .delete()
    .where({ listId, profileId });
};

// List Favorites
export const getFavoriteLists = (
  profileId: string,
  pagination?: Pagination,
): Promise<List[]> => {
  const limit = pagination?.limit || 50;
  const offset = pagination?.offset || 0;

  let query = knexInstance<List>('lists')
    .select('lists.*')
    .select(knexInstance.raw('COUNT("listMembers".id) AS "totalMembers"'))
    .select(knexInstance.raw('COUNT("listFavorites".id) AS "totalFavorites"'))
    .leftJoin('listMembers', 'listMembers.listId', 'lists.id')
    .leftJoin('listFavorites', 'listFavorites.listId', 'lists.id')
    .groupBy('lists.id')
    .where({ 'listFavorites.profileId': profileId })
    .orderBy('lists.id', 'desc')
    .limit(limit)
    .offset(offset);

  return query;
};

export const countFavoriteLists = async (
  profileId: string,
): Promise<number> => {
  let query = knexInstance<List>('lists')
    .count<Record<string, number>>('*')
    .leftJoin('listFavorites', 'listFavorites.listId', 'lists.id')
    .groupBy('lists.id')
    .where({ 'listFavorites.profileId': profileId })
    .first();

  const result = await query;
  return result?.count ? Number(result?.count) : 0;
};

export const isFavoriteList = async (
  listId: string,
  profileId: string,
): Promise<boolean> => {
  let query = knexInstance<ListFavorite>('listFavorites')
    .count<Record<string, number>>('*')
    .where({ profileId, listId })
    .first();

  const result = await query;
  const count = result?.count ? Number(result?.count) : 0;
  return count > 0;
};

// Followed Lists

export const getFollowedLists = (
  profileId: string,
  pagination?: Pagination,
): Promise<List[]> => {
  const limit = pagination?.limit || 50;
  const offset = pagination?.offset || 0;

  const query = knexInstance<List>('lists')
    .select('lists.*')
    .leftJoin('listFavorites', 'lists.id', 'listFavorites.listId')
    .where({ 'listFavorites.profileId': profileId })
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

  return query;
};

export const countFollowedLists = async (
  profileId: string,
): Promise<number> => {
  const query = knexInstance<List>('lists')
    .count<Record<string, number>>('lists.*')
    .leftJoin('listFavorites', 'lists.id', 'listFavorites.listId')
    .where({ 'listFavorites.profileId': profileId });

  const result = await query;
  return result?.count ? Number(result?.count) : 0;
};

export const createListFavorite = async (
  newListFavorite: NewListFavorite,
): Promise<ListFavorite> => {
  const listFavorites = await knexInstance<ListFavorite>('listFavorites')
    .insert(newListFavorite)
    .returning('*');

  return listFavorites[0];
};

export const deleteListFavorite = async (
  listId: string,
  profileId: string,
): Promise<void> => {
  await knexInstance<ListFavorite>('listFavorites')
    .delete()
    .where({ listId, profileId });
};

// List Pinned

export const getListPinned = (
  profileId: string,
  pagination?: Pagination,
): Promise<ListPinned[]> => {
  const limit = pagination?.limit || 50;
  const offset = pagination?.offset || 0;

  const query = knexInstance<ListPinned>('listPinned')
    .select('*')
    .where({ profileId })
    .orderBy('id', 'desc')
    .limit(limit)
    .offset(offset);

  return query;
};

export const countListPinned = async (profileId: string): Promise<number> => {
  let query = knexInstance<ListPinned>('listPinned')
    .count<Record<string, number>>('*')
    .where({ profileId })
    .first();

  const result = await query;
  return result?.count ? Number(result?.count) : 0;
};

export const createListPinned = async (
  newListPinned: NewListPinned,
): Promise<ListPinned> => {
  const listPinned = await knexInstance<ListPinned>('listPinned')
    .insert(newListPinned)
    .returning('*');

  return listPinned[0];
};

export const deleteListPinned = async (
  listId: string,
  profileId: string,
): Promise<void> => {
  await knexInstance<ListPinned>('listPinned')
    .delete()
    .where({ listId, profileId });
};
