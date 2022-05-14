const express = require('express');
const { userControllers } = require('../../controllers/api');
const validates = require('../../middlewares/validates');
const { userValidation } = require('../../validations');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         firstName:
 *           type: string
 *           description: The user first name.
 *         lastName:
 *           type: string
 *           description: The user last name.
 *         email:
 *           type: string
 *           description: The user email.
 *         password:
 *           type: string
 *           description: The user password.
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the record update.
 *       example:
 *          firstName: John
 *          lastName: Doe
 *          email: john.doe@email.com
 *          password: 12345678
 *
 */

router.post('/register', validates(userValidation.register), userControllers.register);
router.post('/login', validates(userValidation.login), userControllers.login);
router.post('/refresh-token', userControllers.refreshToken);
router.post('/logout', userControllers.logout);

module.exports = router;
