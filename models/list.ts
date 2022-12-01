/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         coverPictureUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         ownerProfile:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             handle:
 *               type: string
 *         stats:
 *           type: object
 *           properties:
 *             totalMembers:
 *               type: number
 *             totalFollowers:
 *               type: number
 */
export interface List {
  id: string;
  name: string;
  description: string;
  coverPictureUrl: string;
  createdAt: Date;
  ownerProfile: {
    handle: string;
    id: string;
  };
  stats: {
    totalMembers: number;
    totalFollowers: number;
  };
}
