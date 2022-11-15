import Joi from 'joi';

const onlyNumbers = /^[0-9]*$/;

export const getListSchema = Joi.object({
  listId: Joi.string().max(30).regex(onlyNumbers).required(),
});

export const getOwnedListsSchema = Joi.object({
  userId: Joi.string().max(30).alphanum().required(),
});
