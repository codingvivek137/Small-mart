import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const reqsignUp = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.send({
                success: true,
                message: "UnAuthorized Access,only admin can add new products",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};

