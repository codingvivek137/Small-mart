import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const categoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).send({
                success: false,
                message: "name is required",
            })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            res.status(400).send({
                success: false,
                message: "category already exist"
            })
        }
        const category = await new categoryModel({ name: name, slug: slugify(name) }).save();
        res.status(200).send({
            success: true,
            message: "category saved succesfully",
            category
        })
    } catch (error) {
        res.status(200).send({
            success: false,
            message: "error occured",
            error
        })
    }

}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "updated successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in updation",
            error
        })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "all categories listed",
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in all categories",
            error
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "single category",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            message: "error",
            error
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "deletion successful",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "error in deletion",
            error
        })
    }
}