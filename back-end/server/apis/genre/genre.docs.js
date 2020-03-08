/**
 * @swagger
 * /genre/get-all-genre:
 *  get:
 *    summary: get all genre
 *    tags:
 *      - Genre
 *    responses:
 *       201:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             total_page:
 *               type: number
 *             total_item:
 *               type: number
 *             page:
 *               type: number
 *             item:
 *               type: number
 *             data:
 *               type: array
 *           example: {
               "success": true,
                "message": "Get all genre",
                "data": [
                    {
                    "name": "ok done 233",
                    "detail": "ok done 23",
                    "_id": 0,
                    "__v": 0
                    },
                    {
                    "name": "action",
                    "detail": "khong co gi ca",
                    "_id": 2,
                    "__v": 0
                    },
                    {
                    "name": "action",
                    "detail": "khong co gi ca",
                    "_id": 3,
                    "__v": 0
                    },
                    {
                    "name": "action",
                    "detail": "khong co gi ca",
                    "_id": 4,
                    "__v": 0
                    },
                    {
                    "name": "action",
                    "detail": "khong co gi ca",
                    "_id": 5,
                    "__v": 0
                    },
                    {
                    "name": "action",
                    "detail": "khong co gi ca",
                    "_id": 6,
                    "__v": 0
                    }
                ]
            }

 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */
