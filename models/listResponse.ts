import { List } from './list';

/**
 * @swagger
 * components:
 *   schemas:
 *     ListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             list:
 *               type: object
 *               $ref: '#/components/schemas/List'
 */
export interface ListResponse {
  data: {
    list: List;
  };
}
