import express from 'express'
import { isAdmin, reqsignUp } from '../middlewares/authmiddleware.js';
import { categoryController, deleteCategory, getAllCategory, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the category
 *         name:
 *           type: string
 *           unique: true
 *           description: Name of the category
 *         slug:
 *           type: string
 *           description: URL-friendly identifier for the category (lowercase)
 */
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
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
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /api/v1/category/create-category:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists
 */

/**
 * @swagger
 * /api/v1/category/update-category/{id}:
 *   put:
 *     summary: Update an existing category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Error updating category
 */

/**
 * @swagger
 * /api/v1/category/delete-category/{id}:
 *   delete:
 *     summary: Delete a category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Error deleting category
 */

/**
 * @swagger
 * /api/v1/category/get-category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of all categories
 *       400:
 *         description: Error fetching categories
 */



//create api
router.post('/create-category', reqsignUp, isAdmin, categoryController)

//update api
router.put('/update-category/:id', reqsignUp, isAdmin, updateCategoryController);

//get all category
router.get('/get-category', getAllCategory);

router.get('/single-category/:slug', reqsignUp, isAdmin, singleCategoryController);

router.delete('/delete-category/:id', reqsignUp, isAdmin, deleteCategory)

export default router;