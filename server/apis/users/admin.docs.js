/**
 * @swagger
 * /admin/login:
 *  post:
 *    summary: Admin Login
 *    tags:
 *      - Admin
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        type: object
 *        properties:
 *          userName:
 *            type: string
 *          passWord:
 *            type: string
 *        example: {
 *          "userName": "admin",
 *          "passWord": "admin"
 *        }
 *    responses:
 *       200:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Data result
 *           example: {
 *             'success': true,
 *             'data': {
                  "user": {
                    "_id": "5e4405edc31ea22892122665",
                    "online": true,
                    "userName": "admin",
                    "passWord": "UsPOKskG38RdthTtf5c2b5dc73aaf6c4b4b4b8c790110bd9",
                    "role": "root",
                    "createdAt": "2020-02-12T14:04:29.969Z",
                    "updatedAt": "2020-02-12T14:31:55.733Z",
                    "__v": 0
                  },
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQ0MDVlZGMzMWVhMjI4OTIxMjI2NjUiLCJyb2xlIjoicm9vdCIsImlhdCI6MTU4MTUxNzk0MCwiZXhwIjo0MTczNTE3OTQwfQ.ZHaYK2dPllwWFeQZmONBko8WKjjrmTSq2-gBxrRcM8M",
                  "expiredTime": 2592000000
                }
 *           }
 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */
/**
 * @swagger
 * /admin/user/add-user:
 *  post:
 *    summary: Admin Add New User
 *    tags:
 *      - Admin
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        type: object
 *        properties:
 *          fullName:
 *            type: string
 *          userName:
 *            type: string
 *          passWord:
 *            type: string
 *          email:
 *            type: string
 *          phoneNumber:
 *            type: string
 *        example: {
 *          "fullName": "Nguyen Van A",
 *          "userName": "username",
 *          "passWord": "123123",
 *          "email": "nguyenvana@gmail.com",
 *          "phoneNumber": "0964030454"
 *        }
 *    responses:
 *       200:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Data result
 *           example: {
 *             'success': true,
 *             'data': {
                  "_id": "5e440d0cb08303379b859222",
                  "fullName": "Nguyen Van A",
                  "userName": "usernamee",
                  "passWord": "AYuo2yzh3QrTdcEB7b759938304fc305d7ed567fb68f5a23",
                  "email": "nguyenvanae@gmail.com",
                  "phoneNumber": "0964030454",
                  "createdBy": "5e4405edc31ea22892122665",
                  "createdAt": "2020-02-12T14:34:52.816Z",
                  "updatedAt": "2020-02-12T14:34:52.816Z"
                }
 *           }
 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */

/**
 * @swagger
 * /admin/user/{id}:
 *  put:
 *    summary: Admin Edit User
 *    tags:
 *      - Admin
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: User ID
 *      - in: body
 *        name: body
 *        required: true
 *        type: object
 *        properties:
 *          fullName:
 *            type: string
 *          userName:
 *            type: string
 *          phoneNumber:
 *            type: string
 *          email:
 *            type: string
 *          passWord:
 *            type: string
 *    responses:
 *       200:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Data result
 *           example: {
 *             'success': true,
 *             'payload': {
 *
 *             }
 *           }
 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */
/**
 * @swagger
 * /admin/user/{id}:
 *  delete:
 *    summary: Admin Delete User
 *    tags:
 *      - Admin
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: User Id
 *    responses:
 *       200:
 *         description: The response details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             payload:
 *               type: string
 *               description: Data result
 *           example: {
 *             'success': true
 *           }
 *       401:
 *         description: Not permission
 *       404:
 *         description: Dat not found
 *       422:
 *         description: Unprocessable Entity, the data is not valid
 *       500:
 *         description: When got server exception
 * */
/**
 * @swagger
 * /admin/user/get-all-user:
 *  get:
 *    summary: Admin Get All User
 *    tags:
 *      - Admin
 *    parameters:
 *      - in: query
 *        name: page
 *        type: number
 *        description: Page Data
 *      - in: query
 *        name: limit
 *        type: number
 *        description: Total Item in One Page
 *      - in: query
 *        name: text
 *        type: string
 *        description: Search User By Text
 *    responses:
 *       200:
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
                "total_page": 2,
                "total_item": 2,
                "page": 1,
                "item": 1,
                "data": [
                  {
                    "_id": "5e440b9c38a63434a688d4b4",
                    "email": "nguyenvanaa@gmail.com",
                    "passWord": "iNp2THSF7KKVCv0T137d33916463b407b6aaee93e1842bb6",
                    "phoneNumber": "0964030454",
                    "userName": "usernames",
                    "fullName": "Nguyen Van A",
                    "createdAt": "2020-02-12T14:28:44.111Z",
                    "updatedAt": "2020-02-12T14:28:44.111Z",
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
