import { NewListMember } from '@/lib/types';

/**
 * @swagger
 * components:
 *   schemas:
 *     MemberResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             member:
 *               type: object
 *               properties:
 *                 profileId:
 *                   type: string
 *                 listId:
 *                   type: string
 */
export interface MemberResponse {
  data: {
    member: NewListMember;
  };
}
