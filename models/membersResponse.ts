import { Member } from './member';

/**
 * @swagger
 * components:
 *   schemas:
 *     MembersResponse:
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
 *                     $ref: '#/components/schemas/Member'
 *                 pageInfo:
 *                   type: object
 *                   $ref: '#/components/schemas/PageInfo'
 */
export interface MembersResponse {
  data: {
    members: {
      items: Member[];
      pageInfo: {
        totalCount: number;
      };
    };
  };
}
