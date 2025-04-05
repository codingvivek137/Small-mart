import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                {/* Left Text */}
                <h5 className="mb-3 mb-md-0 text-center text-md-start">
                    &copy; {new Date().getFullYear()} All Rights Reserved.
                </h5>

                {/* Navigation Links */}
                <div className="d-flex gap-3 text-center">
                    <Link to="/about" className="text-white text-decoration-none">About</Link>
                    <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
                    <Link to="/policy" className="text-white text-decoration-none">Privacy Policy</Link>
                </div>

                {/* Social Media Icons */}
                <div className="d-flex gap-3 mt-3 mt-md-0">
                    <a
                        href="https://instagram.com/yourhandle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href="https://x.com/yourhandle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white"
                    >
                        <Twitter size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
