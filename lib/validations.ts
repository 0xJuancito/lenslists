import Joi from 'joi';

export const MAX_LISTS_COUNT = 10;
export const MAX_MEMBERS_COUNT = 50;

const onlyNumbers = /^[0-9]*$/;
const limit = Joi.number().min(1).max(50);
const offset = Joi.number().min(0);
const profileId = Joi.string().max(30).alphanum().required();

const list = {
  id: Joi.string().max(30).regex(onlyNumbers).required(),
  name: Joi.string().max(25).required(),
  description: Joi.string().max(100).required(),
  coverPictureUrl: Joi.string().uri().max(1000).required(),
};

export const listIdSchema = Joi.object({
  listId: list.id,
});

export const userIdSchema = Joi.object({
  userId: profileId,
});

export const ownedLists = Joi.object({
  userId: profileId,
  limit,
  offset,
});

export const listMembers = Joi.object({
  listId: list.id,
  limit,
  offset,
});

export const listIdMemberIdSchema = Joi.object({
  listId: list.id,
  userId: profileId,
});

export const upsertListSchema = Joi.object({
  name: list.name,
  description: list.description,
  coverPictureUrl: list.coverPictureUrl,
});

export const newListMemberSchema = Joi.object({
  profileId,
});

export const maxListsCount = Joi.number().max(MAX_LISTS_COUNT - 1);

export const maxMembersCount = Joi.number().max(MAX_MEMBERS_COUNT - 1);
