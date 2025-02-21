
import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";


const Layout = ({ children, title, description, author, keywords }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "70vh" }}>
                <Toaster />
                {children}</main>

            <Footer />
        </div>
    );
};
Layout.defaultProps = {
    title: "E-commerce",
    description: "MERN Stack Project",
    keywords: "Reactjs,nodejs,mongodb",
    author: "vivek"
}

export default Layout;
