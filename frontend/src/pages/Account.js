import React, { useState, useEffect } from 'react';
import '../App.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRides } from '../context/RidesContext';
import API_BASE_URL from '../ApiBaseURL';
import Cookies from "js-cookie";

const Account = ({ onLogin }) => {


    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { resetRides } = useRides();



    const handleLogin = () => {

        resetRides();

        fetch(`${API_BASE_URL}users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Login response:', data);
                if (data.statusCode === 200) {
                    const userData = { email: data.data.user.email, name: data.data.user.name, contact: data.data.user.contact, isDriver: data.data.user.isDriver, carName: data.data.user.driverVerification.carName, carNumber: data.data.user.driverVerification.carNumber, livePhoto: data.data.user.driverVerification.livePhoto, savedRides: [data.data.user.savedRides] };
                    Cookies.set("accessToken", data.data.accessToken);
                    Cookies.set("refreshToken", data.data.refreshToken);
                    onLogin(userData);
                    alert('Login successful');
                } else if (data.statusCode === 401) {
                    alert('Invalid Credentials. Please try again')
                }
                else {
                    console.error('Login failed:', data.message);
                    alert('Error logging into account');
                }
            })
            .catch(error => console.error('Error logging in:', error));
    };


    const handleSignup = (e) => {

        e.preventDefault();

        fetch(`${API_BASE_URL}users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: formData.name, contact: formData.contact, email: formData.email, password: formData.password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Registration response:', data);
                if (data.statusCode === 201) {
                    alert('Signup Successful')
                } else if (data.statusCode === 409) {
                    alert('Username already exists. Please choose a different username.');
                }
                else {
                    console.error('Registration failed:', data.message);
                }
            })
            .catch(error => console.error('Error registering:', error));
    };


    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateContact(contact) {
        const re = /^[9876][0-9]{9}$/;
        return re.test(String(contact));
    }

    function validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(String(password));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (!isLogin) {
            let newErrors = { ...errors };

            switch (name) {
                case 'email':
                    newErrors.email = validateEmail(value) ? '' : 'Invalid email address';
                    break;
                case 'contact':
                    newErrors.contact = validateContact(value) && value.length === 10
                        ? '' : 'Contact must be exactly 10 digits with starting digit b/w 6 to 9';
                    break;
                case 'password':
                    newErrors.password = validatePassword(value)
                        ? '' : 'Password must be at least 8 characters with at least one uppercase letter, one number, and one special character';
                    break;
                default:
                    break;
            }

            setErrors(newErrors);
        }
    }




    return (
        <div className="flex flex-col">
            <div id="account" className="flex flex-col md:flex-row mt-20 items-center justify-center">

                <div className="md:w-1/2 w-full text-center md:text-left mt-20">
                    <h1 className="text-3xl font-bold text-slate-800 md:ml-12 mb-6">
                        Share the Ride! <br />
                        &emsp;&emsp;Share the Journey!
                    </h1>
                    <img
                        src="assets/acc.jpg"
                        alt="logo"
                        className="w-4/5 md:w-3/4 md:h-80 mx-auto md:ml-12"
                    />
                </div>

                <div className="md:w-1/3 w-11/12 mt-10 md:mt-0 bg-white p-8">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-slate-800">
                        {isLogin ? "Login" : "Sign Up"}
                    </h2>

                    {isLogin ? (
                        <input
                            type="text"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    {isLogin ? (
                        <div className="flex flex-row items-center relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="contact"
                                placeholder="Contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {!isLogin && errors.contact && (
                                <p className="text-red-500 text-sm mb-2">{errors.contact}</p>
                            )}
                        </>
                    )}

                    {isLogin ? (
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all"
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {!isLogin && errors.email && (
                                <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                            )}
                            <div className="flex flex-row items-center relative mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {!isLogin && errors.password && (
                                <p className="text-red-500 text-sm mb-2">{errors.password}</p>
                            )}
                            <button
                                onClick={handleSignup}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-all"
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                    <p
                        onClick={() => setIsLogin(!isLogin)}
                        className="mt-4 text-blue-600 text-center cursor-pointer hover:underline"
                    >
                        {isLogin ? "Don't have an account? Sign up now!" : "Already have an account? Log in!"}
                    </p>
                </div>
            </div>
        </div>
    );
};



export default Account;

