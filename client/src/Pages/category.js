
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory.js";
import Layout from "../Components/layout/Layout.js";
import "../styles/CategoryProductStyle.css";
const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"All Categories"}>
            <div className="container category" style={{ marginTop: "100px" }}>
                <div className="row container ">
                    {categories.map((c) => (
                        <div className="col-md-4 mt-2 mb-3 gx-15 gy-15" key={c._id} >
                            <div className="card hover-overlay">
                                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                                    {c.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
