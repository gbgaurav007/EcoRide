import React, { useState } from 'react';
import Navbar from './Navbar';
import './App.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRides } from './RidesContext';

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

        fetch('http://localhost:3000/login', {
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
                if (data.code === 200) {
                    const userData = { email: formData.email, name: data.user.name, contact: data.user.contact, isDriver: data.user.isDriver, carName: data.user.driverVerification.carName, carNo: data.user.driverVerification.carNo, livePhoto: data.user.driverVerification.livePhoto };
                    onLogin(userData);
                    alert('Login successful');
                } else if (data.code === 401) {
                    alert('Invalid Credentials. Please try again')
                }
                else {
                    console.error('Login failed:', data.msg);
                    alert('Error logging into account');
                }
            })
            .catch(error => console.error('Error logging in:', error));
    };


    const handleSignup = (e) => {

        e.preventDefault();

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: formData.name, contact: formData.contact, email: formData.email, password: formData.password }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 201) {
                    alert('Signup Successful')
                } else if (data.code === 409) {
                    alert('Username already exists. Please choose a different username.');
                }
                else {
                    console.error('Registration failed:', data.msg);
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
            <div><Navbar /></div>

            <div id="account" className="flex flex-col md:flex-row mt-20 md:ml-10">
                <div>
                    <h1 className="text-3xl font-bold md:mt-10 mt-10 ml-5 md:ml-12 text-slate-800">Share the Ride! <br />&emsp;&emsp;&emsp;Share the Journey!</h1>
                    <img src="acc.jpg" alt='logo' className="w-auto h-50 md:w-auto md:h-80 mx-auto md:ml-12 mt-4 md:mt-8" />
                </div>

                <div className="w-3/4 md:w-1/4 md:mt-10 flex flex-col md:ml-20 ml-8 md:py-10">

                    <h2 className="text-xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

                    {isLogin ? (
                        <input
                            type="text"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />) : (
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />)}

                    {isLogin ? (
                        <>
                            <div className='flex flex-row relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className='w-full'
                                />
                                <div onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="contact"
                                placeholder="Contact"
                                value={formData.contact}
                                onChange={handleChange}
                            />
                            {!isLogin && errors.contact && <p style={{ color: 'red', fontSize: '14px', width: 'full' }}>{errors.contact}</p>}
                        </>
                    )}

                    {isLogin ? (
                        <button onClick={handleLogin}>Login</button>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {!isLogin && errors.email && <p style={{ color: 'red', fontSize: '14px' }}>{errors.email}</p>}
                        </>
                    )}

                    {isLogin ? (
                        <p onClick={() => setIsLogin(!isLogin)}>
                            Create an account
                        </p>
                    ) : (
                        <>
                            <div className="flex flex-row relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full'
                                />
                                <div onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                                </div>
                            </div>
                            {!isLogin && errors.password && <p style={{ color: 'red', fontSize: '14px' }}>{errors.password}</p>}
                        </>
                    )}

                    {isLogin ? (<p></p>) : (
                        <button onClick={handleSignup}>Sign Up</button>
                    )}

                    <p onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? '' : 'Already have an account?'}
                    </p>

                </div>
            </div>
        </div>
    );
};



export default Account;

