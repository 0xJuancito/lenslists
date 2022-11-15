import Joi from 'joi';

const onlyNumbers = /^[0-9]*$/;

export const getListSchema = Joi.object({
  listId: Joi.string().max(30).required().regex(onlyNumbers),
});
