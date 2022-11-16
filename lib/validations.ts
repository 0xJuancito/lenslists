import Joi from 'joi';

const onlyNumbers = /^[0-9]*$/;
const limit = Joi.number().min(1).max(50);
const offset = Joi.number().min(0);
const profileId = Joi.string().max(30).alphanum().required();

const list = {
  id: Joi.string().max(30).regex(onlyNumbers).required(),
  name: Joi.string().max(25).required(),
  ownedBy: profileId.required(),
  description: Joi.string().max(100),
  coverPictureUrl: Joi.string().uri().max(1000),
  pictureUrl: Joi.string().uri().max(1000),
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
  userId: profileId,
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
  pictureUrl: list.pictureUrl,
});

export const newListMemberSchema = Joi.object({
  profileId,
});
