import express from "express";
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testtoken, updateProfileController } from "../controllers/authcontroller.js";
import { isAdmin, reqsignUp } from "../middlewares/authmiddleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *         - address
 *         - answer
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user
 *         name:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           format: email
 *           unique: true
 *           description: Unique email address of the user
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (hashed in the database)
 *         phone:
 *           type: string
 *           description: Contact phone number of the user
 *         address:
 *           type: object
 *           description: Address details of the user
 *           additionalProperties: true
 *         answer:
 *           type: string
 *           description: Security answer for password recovery
 *         role:
 *           type: integer
 *           default: 0
 *           description: Role of the user (0 for normal user, 1 for admin, etc.)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 */
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related endpoints
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - address
 *               - answer
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User already registered
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns token
 *       404:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Reset password using email and security answer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - answer
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               answer:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       404:
 *         description: Invalid email or security answer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/orders:
 *   get:
 *     summary: Get user's orders
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user's orders
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/all-orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all orders
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/auth/order-status/{orderId}:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */



const router = express.Router();

router.post("/register", registerController)

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController)

router.get("/test", reqsignUp, isAdmin, testtoken);

router.get("/auth-test", reqsignUp, (req, res) => {
    res.status(200).send({ Ok: true });
})

router.get("/admin-auth", reqsignUp, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

router.put("/profile", reqsignUp, updateProfileController);

//orders
router.get("/orders", reqsignUp, getOrdersController);

//all orders
router.get("/all-orders", reqsignUp, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    reqsignUp,
    isAdmin,
    orderStatusController
);


export default router;
