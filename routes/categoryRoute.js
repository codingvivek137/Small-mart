import express from 'express'
import { isAdmin, reqsignUp } from '../middlewares/authmiddleware.js';
import { categoryController, deleteCategory, getAllCategory, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//create api
router.post('/create-category', reqsignUp, isAdmin, categoryController)

//update api
router.put('/update-category/:id', reqsignUp, isAdmin, updateCategoryController);

//get all category
router.get('/get-category', getAllCategory);

router.get('/single-category/:slug', reqsignUp, isAdmin, singleCategoryController);

router.delete('/delete-category/:id', reqsignUp, isAdmin, deleteCategory)

export default router;