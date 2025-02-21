import express from "express";
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testtoken, updateProfileController } from "../controllers/authcontroller.js";
import { isAdmin, reqsignUp } from "../middlewares/authmiddleware.js";

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
