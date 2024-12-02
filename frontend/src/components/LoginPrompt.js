import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LoginPrompt = () => {
    const navigate = useNavigate();

    const handleProceed = () => {
        navigate("/account");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white text-cyan-800 p-10 flex flex-col items-center m-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Please Login to Continue</h1>
                <p className="text-lg mb-6 text-center">
                    Access to this page requires authentication. Please proceed to your account by logging in.
                </p>
                <button
                    onClick={handleProceed}
                    className="bg-cyan-800 hover:bg-cyan-900 text-white text-lg font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default LoginPrompt;