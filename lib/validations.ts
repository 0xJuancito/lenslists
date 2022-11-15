import Joi from 'joi';

const onlyNumbers = /^[0-9]*$/;
const profileId = Joi.string().max(30).alphanum().required();

const list = {
  id: Joi.string().max(30).regex(onlyNumbers).required(),
  name: Joi.string().max(25).required(),
  ownedBy: profileId.required(),
  description: Joi.string().max(100),
  coverPicture: Joi.string().uri().max(1000),
};

export const listIdSchema = Joi.object({
  listId: list.id,
});

export const userIdSchema = Joi.object({
  userId: profileId,
});

export const upsertListSchema = Joi.object({
  name: list.name,
  ownedBy: list.ownedBy,
  description: list.description,
  coverPicture: list.coverPicture,
});
