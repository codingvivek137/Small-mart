import express from 'express';
import { isAdmin, reqsignUp } from '../middlewares/authmiddleware.js';
import Formidable from 'express-formidable';
import { brainTreePaymentController, braintreeTokenController, createProductContoller, deleteProductController, filterProductController, getProductController, getProductPhotoController, getSingleProductContoller, productCategoryController, productCountController, productListController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - description
 *         - price
 *         - category
 *         - quantity
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         slug:
 *           type: string
 *           description: URL-friendly identifier for the product
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         category:
 *           type: string
 *           format: uuid
 *           description: Category ID the product belongs to
 *         quantity:
 *           type: integer
 *           description: Available quantity of the product
 *         photo:
 *           type: object
 *           properties:
 *             data:
 *               type: string
 *               format: binary
 *               description: Image data stored as a binary buffer
 *             contentType:
 *               type: string
 *               description: MIME type of the image (e.g., image/png, image/jpeg)
 *         shipping:
 *           type: boolean
 *           description: Indicates whether the product requires shipping
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the product was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the product was last updated
 */


router.post('/create-product', reqsignUp, isAdmin, Formidable(), createProductContoller);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductContoller);

router.get("/product-photo/:pid", getProductPhotoController);

router.put("/update-product/:pid", Formidable(), updateProductController);

router.delete("/delete-product/:pid", Formidable(), deleteProductController);

router.post("/product-filters", filterProductController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", relatedProductController);

router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", reqsignUp, brainTreePaymentController);

export default router;