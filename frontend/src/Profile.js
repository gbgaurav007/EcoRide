import React from "react";
import Navbar from "./Navbar";
import { SlUser } from "react-icons/sl";
import { CiCirclePlus } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Profile({ userData }) {

    const navigate = useNavigate();

    const handleLogout = () => {

        fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    alert('Logout successful');
                    navigate('/');
                } else {
                    console.error('Logout failed:', data.msg);
                }
            })
            .catch(error => console.error('Error logging out:', error));
    };


    return (
        <div className="flex flex-col">
            <div><Navbar /></div>
            <div className="bg-white h-20"></div>


            {userData ? (
                <div className="flex flex-col mt-10">

                    <div className="flex flex-col md:px-80 px-5">
                        <div className="flex w-full justify-between">
                            <div>
                                <h3 className="text-slate-600 text-2xl font-bold">{userData.name}</h3>
                                <p className="font-bold text-gray-500">Newcomer</p>
                            </div>
                            <SlUser className="text-6xl" />
                        </div>
                        <div className="flex py-10">
                            <CiCirclePlus className="text-xl mt-1 text-emerald-500 font-bold" />&nbsp;&nbsp;
                            <p className="text-lg text-emerald-500 font-bold">Add profile picture</p>
                        </div>
                    </div>

                    <div><hr className="mx-60 border-t border-gray-300" /></div>

                    <div className="flex flex-col mt-10 md:px-80 px-5">
                        <h2 className="text-2xl text-slate-700 font-bold">Personal Details</h2>

                        <div className="py-7">
                            <div className="flex">
                                <MdEmail className="text-xl mt-1 text-slate-700" />&nbsp;&nbsp;
                                <p className="text-lg text-slate-700">{userData.email}</p>
                            </div>
                            <div className="flex">
                                <FaPhone className="text-xl mt-1 text-slate-700" />&nbsp;&nbsp;
                                <p className="text-lg text-slate-700">{userData.contact}</p>
                            </div>
                        </div>

                        <p className="text-lg text-emerald-500 font-bold">Edit personal details</p>
                    </div>

                    <div><hr className="mx-60 border-t border-gray-300 my-8" /></div>

                    <button className="text-lg text-emerald-500 font-bold" onClick={handleLogout}>Logout</button>

                    <div><Footer /></div>

                </div>
            ) : (
                <h1 className="text-2xl text-slate-700 font-bold text-center mt-5">Login to view your Profile!</h1>
            )}
        </div>
    )
}

export default Profile;