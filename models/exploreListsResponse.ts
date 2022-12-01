import { List } from './list';

/**
 * @swagger
 * components:
 *   schemas:
 *     ExploreListsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             lists:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/List'
 *                 pageInfo:
 *                   type: object
 *                   $ref: '#/components/schemas/PageInfo'
 */
export interface ExploreListsResponse {
  data: {
    lists: {
      items: List[];
      pageInfo: {
        totalCount: number;
      };
    };
  };
}
