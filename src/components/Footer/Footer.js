import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <h3>© 2022 Drag and Drop Calculator. All Rights Reserved.</h3>
                <p>
                    Developed by
                    <a
                        href="https://github.com/TouhidZaman"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Muhammad Touhiduzzaman
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
