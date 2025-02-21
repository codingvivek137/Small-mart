import fs from 'fs'
import productModel from '../models/productModel.js';
import categoryModel from "../models/categoryModel.js";
import orderModel from '../models/orderModel.js';
import slugify from 'slugify';
import braintree from 'braintree';
import dotenv from 'dotenv';

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


export const createProductContoller = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" });
            case !description:
                return res.status(500).send({ error: "description is required" });
            case !price:
                return res.status(500).send({ error: "price is required" });
            case !category:
                return res.status(500).send({ error: "category is required" });
            case !quantity:
                return res.status(500).send({ error: "quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and its size should be less than 1mb" })

        }
        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: "product created succesfully",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in creating product",
            error
        })
    }

}

export const getProductController = async (req, res) => {
    try {
        const allProduct = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "got all product succesfully",
            allProduct,
            total: allProduct.length
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in getting product",
            error
        })
    }
}

export const getSingleProductContoller = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "your product",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in this product",
            error
        })
    }
}

export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById({ _id: req.params.pid }).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in getting photo",
            error

        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

export const filterProductController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let arg = {};
        if (checked.length > 0) arg.category = checked;
        if (radio.length) arg.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(arg);
        res.status(200).send({
            success: true,
            message: "here's the filtered product",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in filtering products",
            error
        })
    }
};

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "here's the total count",
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error occured",
            error
        })
    }
};

export const productListController = async (req, res) => {
    try {
        const perPage = 5;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error",
            error
        })
    }
}

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in related Api",
            error
        })
    }
}

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting products",
        });
    }
};

//payment gateway
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const brainTreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};