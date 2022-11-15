import Joi from 'joi';

const onlyNumbers = /^[0-9]*$/;
const listId = Joi.string().max(30).regex(onlyNumbers).required();
const profileId = Joi.string().max(30).alphanum().required();

export const getListSchema = Joi.object({
  listId,
});

export const getOwnedListsSchema = Joi.object({
  userId: profileId,
});

export const getListMembersSchema = Joi.object({
  listId,
});
