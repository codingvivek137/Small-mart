import express from 'express';
import { isAdmin, reqsignUp } from '../middlewares/authmiddleware.js';
import Formidable from 'express-formidable';
import { brainTreePaymentController, braintreeTokenController, createProductContoller, deleteProductController, filterProductController, getProductController, getProductPhotoController, getSingleProductContoller, productCategoryController, productCountController, productListController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';

const router = express.Router();

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