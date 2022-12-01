/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             deleted:
 *               type: boolean
 */
export interface DeleteResponse {
  data: {
    deleted: boolean;
  };
}
