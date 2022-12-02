/**
 * @swagger
 * components:
 *   schemas:
 *     UpsertList:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *           required: true
 *         coverPictureUrl:
 *           type: string
 *           required: true
 */
export interface UpsertList {
  name: string;
  description: string;
  coverPictureUrl: string;
}
