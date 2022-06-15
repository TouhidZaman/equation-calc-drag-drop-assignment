import React from "react";
import "./Spinner.css";
import spinner from "../../../images/spinner-1s-200px.svg";

const Spinner = () => {
    return (
        <div className="spinner">
            <img src={spinner} alt="Loading..." />
        </div>
    );
};

export default Spinner;
