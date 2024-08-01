import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GrMoney, GrSecure, GrUserExpert } from "react-icons/gr";
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoPersonOutline, IoPricetagOutline } from "react-icons/io5";
import { CiCirclePlus, CiCircleMinus, CiUser } from "react-icons/ci";
import { LiaCarSideSolid, LiaAngleDoubleRightSolid } from "react-icons/lia";
import './App.css';

const places = [
    "Elante Mall", "Sector 17", "Rock Garden", "Tribune Chowk", "ISBT 43", "PEC",
    "Sukhna Lake", "Palika Bazaar", "Shastri Market", "PU", "GMCH 32", "I.S Bindra Stadium", "Airport, Mohali",
    "Railway Station", "Chhatbir Zoo", "Mansa Devi Temple", "Town Park, Panchkula", "Pinjore Garden",
    "Best Price, Zirakpur", "Haldirams, Derabassi"
];

function OfferRide({userData}) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentTime, setCurrentTime] = useState('');
    const today = new Date().toISOString().split('T')[0];

    const [leavingFrom, setLeavingFrom] = useState("");
    const [goingTo, setGoingTo] = useState("");
    const [date, setDate] = useState(today);
    const [time, setTime] = useState(currentTime);
    const [passengers, setPassengers] = useState(1);
    const [price, setPrice] = useState("");
    const [filteredLeavingFrom, setFilteredLeavingFrom] = useState([]);
    const [filteredGoingTo, setFilteredGoingTo] = useState([]);
    const [showLeavingFromSuggestions, setShowLeavingFromSuggestions] = useState(false);
    const [showGoingToSuggestions, setShowGoingToSuggestions] = useState(false);
    const leavingFromRef = useRef(null);
    const goingToRef = useRef(null);


    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        if (date === today) {
            setTime(currentTime);
        }
    }, [currentTime, date]);


    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (leavingFromRef.current && !leavingFromRef.current.contains(event.target)) {
            setShowLeavingFromSuggestions(false);
        }
        if (goingToRef.current && !goingToRef.current.contains(event.target)) {
            setShowGoingToSuggestions(false);
        }
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case "leavingFrom":
                setLeavingFrom(value);
                setFilteredLeavingFrom(places.filter(place => place.toLowerCase().startsWith(value.toLowerCase())));
                setShowLeavingFromSuggestions(true);
                break;
            case "goingTo":
                setGoingTo(value);
                setFilteredGoingTo(places.filter(place => place.toLowerCase().startsWith(value.toLowerCase())));
                setShowGoingToSuggestions(true);
                break;
            case "date":
                setDate(value);
                if (value === today) {
                    setTime(currentTime);
                } else if (new Date(value) > new Date(today)) {
                    setTime('00:00');
                }
                break;
            case "currentTime":
                if (date === today) {
                    if (value >= currentTime) {
                        setTime(value);
                    }
                } else {
                    setTime(value);
                }
                break;
            case "price":
                setPrice(Number(value));
                break;
            default:
                break;
        }
    };

    const handleIncrementPassenger = () => {
        if (passengers < 4) {
            setPassengers(passengers + 1);
        }
    };

    const handleDecrementPassenger = () => {
        if (passengers > 1) {
            setPassengers(passengers - 1);
        }
    };

    const driverQuestions = [
        {
            id: 1,
            ques: "How do I sign up to become a driver?",
            ans: "To sign up, simply visit our website and navigate to the driver registration page. Fill out the required information, which typically includes personal details, vehicle information, and any necessary documentation such as your driver's license and insurance. Once your information is submitted, our team will review your application and notify you of the next steps."
        },

        {
            id: 2,
            ques: "What are the requirements to become a driver?",
            ans: "To become a driver with us, you must meet certain criteria, including possessing a valid driver's license, having a clean driving record with no major infractions, owning a registered and insured vehicle that meets our standards, and passing a background check. These requirements help ensure the safety and quality of our service."
        },

        {
            id: 3,
            ques: "How do I get paid?",
            ans: "You'll receive payment for your services directly through our platform. Payments are typically processed on a weekly or bi-weekly basis, depending on your preference. You can choose to receive payments via direct deposit to your bank account or through other available payment methods."
        },

        {
            id: 4,
            ques: "Is there a rating system for drivers?",
            ans: "Yes, we operate a rating system where riders can provide feedback on their experience with you after each ride. Your overall rating is an important factor in determining your reliability and professionalism as a driver, and it can affect your ability to receive ride requests and incentives."
        },

        {
            id: 5,
            ques: "What to do if a rider doesn't show up for their ride?",
            ans: "In the event that a rider fails to show up for their scheduled ride, you can mark the ride as a no-show in the app. By doing so, you'll still receive a cancellation fee for your time and effort. This helps compensate you for the inconvenience of waiting for the rider."
        },

        {
            id: 6,
            ques: "How do I handle disputes with riders?",
            ans: "If you encounter any disputes or issues with riders, you can report them through the app or by contacting our support team directly. We take all reports seriously and will investigate the matter thoroughly to ensure a fair resolution. Your safety and satisfaction are our top priorities, and we're here to support you every step of the way."
        },

    ];

    const [expandedItems, setExpandedItems] = useState({});

    const toggleContent = (id) => {
        setExpandedItems((prevExpandedItems) => ({
            ...prevExpandedItems,
            [id]: !prevExpandedItems[id],
        }));
    };

    const faqItems = driverQuestions.map((item) => (
        <div className="container" key={item.id}>
            <h2 className="text-base md:text-xl font-bold text-slate-700">{item.ques}</h2>
            <p className={`content ${expandedItems[item.id] ? 'expanded' : ''}`}>
                {item.ans}
            </p>
            {expandedItems[item.id] ? (
                <a><button
                    className="read-more-btn"
                    onClick={() => toggleContent(item.id)}
                >
                    read less
                </button></a>
            ) : (
                <a><button
                    className="read-more-btn"
                    onClick={() => toggleContent(item.id)}
                >
                    read more
                </button></a>
            )}
            <hr className="mt-4 border-gray-300" />
        </div>
    ));

    const publishRide = (e) => {
        e.preventDefault();

        if (!leavingFrom || !goingTo || !price) {
            alert('Please fill all the fields');
            return;
        }

        if (leavingFrom === goingTo) {
            alert('Pick-up and Drop destinations cannot be same. Please choose a different destination');
            return;
        }

        const driverCarName = userData.carName;
        const driverCarNo = userData.carNo;

        const rideDetails = {
            driverCarName,
            driverCarNo,
            leavingFrom,
            goingTo,
            date,
            time,
            passengers,
            price
        };

        fetch('http://localhost:3000/createRide', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rideDetails),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.code === 201) {
                    alert('Ride created successfully!');
                }
                else {
                    console.error('Failed:', data.msg);
                    alert('Error creating post');
                }
            })
            .catch(error => console.error('Error creating post:', error));
    }


    return (
        <div className="flex flex-col">
            <div><Navbar /></div>
            <div className="bg-white h-20"></div>

            <div className="bg-emerald-100 p-10">
                <div className="flex-col h-full">
                    <div>
                        <h2 className="text-slate-800 md:text-4xl text-2xl font-bold text-center">Share your ride with passengers!</h2>
                    </div>
                    <div className="md:flex md:mt-12 mt-5 h-full justify-center">
                        <div className="md:flex-col bg-white rounded-2xl shadow-md overflow-hidden md:w-1/4 h-full md:ml-20">
                            <div className="flex-col items-center px-4 py-4 border-b border-gray-200">

                                <div className="flex flex-1">
                                    <IoLocationOutline className="mr-2 text-xl mt-1" />
                                    <input
                                        type="text"
                                        className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                                        placeholder="Leaving from"
                                        value={leavingFrom}
                                        onChange={(e) => handleInputChange("leavingFrom", e.target.value)}
                                        ref={leavingFromRef}
                                        required
                                    />
                                    {showLeavingFromSuggestions && (
                                        <ul className="absolute bg-white border border-gray-300 rounded-md w-full mt-11 max-h-24 overflow-y-auto" style={{ maxWidth: leavingFromRef.current.offsetWidth }}>
                                            {filteredLeavingFrom.map((place, index) => (
                                                <li key={index} className="py-1 px-3 cursor-pointer hover:bg-gray-200" onClick={() => { setLeavingFrom(place); setShowLeavingFromSuggestions(false); }}>
                                                    {place}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="flex flex-1 items-center border-t border-gray-300 my-2"></div>

                                <div className="flex flex-1">
                                    <IoLocationOutline className="mr-2 text-xl mt-1" />
                                    <input
                                        type="text"
                                        className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                                        placeholder="Going to"
                                        value={goingTo}
                                        onChange={(e) => handleInputChange("goingTo", e.target.value)}
                                        ref={goingToRef}
                                        required
                                    />
                                    {showGoingToSuggestions && (
                                        <ul className="absolute bg-white border border-gray-300 rounded-md mt-11 w-full max-h-24 overflow-y-auto" style={{ maxWidth: goingToRef.current.offsetWidth }}>
                                            {filteredGoingTo.map((place, index) => (
                                                <li key={index} className="py-1 px-3 cursor-pointer hover:bg-gray-200" onClick={() => { setGoingTo(place); setShowLeavingFromSuggestions(false); }}>
                                                    {place}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="flex flex-1 items-center border-t border-gray-300 my-2"></div>

                                <div className="flex flex-1 items-center">
                                    <IoCalendarOutline className="mr-2 text-xl" />
                                    <input
                                        type="date"
                                        className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                                        placeholder="Date"
                                        value={date}
                                        onChange={(e) => handleInputChange("date", e.target.value)}
                                        style={{ WebkitAppearance: "none" }}
                                        min={today}
                                        required
                                    />
                                </div>

                                <div className="flex flex-1 items-center border-t border-gray-300 my-2"></div>

                                <div className="flex flex-1 items-center">
                                    <IoTimeOutline className="mr-2 text-xl" />
                                    <input
                                        type="time"
                                        className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                                        placeholder="Time"
                                        value={time}
                                        onChange={(e) => handleInputChange("currentTime", e.target.value)}
                                        style={{ WebkitAppearance: "none" }}
                                        min={date === today ? currentTime : "00:00"}
                                        required
                                    />
                                </div>

                                <div className="flex flex-1 items-center border-t border-gray-300 my-2"></div>

                                <div className="flex flex-1 items-cente">
                                    <IoPersonOutline className="mr-2 text-xl" />
                                    <div className="flex flex-1 justify-between">
                                        <div className="flex">
                                            <div className="bg-white border-none px-2">{passengers}</div>
                                            <div className="text-gray-600">
                                                {passengers === 1 ? 'passenger' : 'passengers'}
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <button onClick={handleDecrementPassenger} className="text-2xl">
                                                <CiCircleMinus />
                                            </button>
                                            <button onClick={handleIncrementPassenger} className="text-2xl">
                                                <CiCirclePlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 items-center border-t border-gray-300 my-2"></div>

                                <div className="flex flex-1 items-center">
                                    <IoPricetagOutline className="mr-2 text-xl" />
                                    <input
                                        type="number"
                                        className="flex-1 bg-transparent border-none py-1 px-3 focus:outline-none"
                                        placeholder="Recommended Price (Rs.)"
                                        value={price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        style={{ WebkitAppearance: "none" }}
                                        required
                                    />
                                </div>

                            </div>

                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-r w-full" onClick={publishRide}>
                                Publish Ride
                            </button>
                        </div>

                        <div className="md:mr-4 md:flex mt-5 md:ml-20">
                            <img src="img3.png" alt="offer" className="md:h-80 md:w-auto h-60" />
                        </div>
                    </div>
                </div>
            </div>


            <div className="p-10 md:ml-10">
                <h2 className="text-slate-700 md:text-3xl md:mt-10 md:ml-10 mt-5 ml-5 md:mb-5 text-2xl font-bold text-center">Publish your ride in minutes!</h2>
                <div className="md:flex mt-10 md:ml-10">
                    <div className="mb-10">
                        <video width="400" height="300" controls className="rounded-2xl">
                            <source src="vid.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="flex-col md:ml-10 px-4 md:w-1/2">

                        <div className="flex mb-5">
                            <CiUser className="text-6xl mt-4 mr-4" />
                            <div>
                                <h5 className="text-xl font-semibold">Create your account</h5>
                                <p>
                                    Go to the Login/Signup page and create your account on EcoRide. Check all
                                    basic details like email, phone number thoroughly before signing in.
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-5">
                            <LiaCarSideSolid className="text-6xl mt-4 mr-4" />
                            <div>
                                <h5 className="text-xl font-semibold">Verify id and Publish your Ride</h5>
                                <p>
                                    Verifying your id is necessary to increase trust between all members. After this step,
                                    publish your ride by filling pickup details, price etc.
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-5">
                            <LiaAngleDoubleRightSolid className="text-6xl mt-4 mr-4" />
                            <div>
                                <h5 className="text-xl font-semibold">Accept Booking Requests</h5>
                                <p>
                                    Review passenger profiles and accept their requests to ride with you.
                                    That is how easy it is to start saving on travel costs!
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="bg-gray-200 mt-5 md:mt-15 p-5">
                <h2 className="text-slate-800 md:text-3xl md:mt-10 md:ml-10 mt-5 ml-5 md:mb-5 text-2xl font-bold">Carpool with EcoRide!</h2>
                <div className="flex flex-col md:flex-row justify-between mt-8 px-4 md:px-0 md:mb-10">

                    <div className="flex flex-col md:w-1/3 md:pl-20">
                        <GrMoney className="text-2xl mb-2" />
                        <h5 className="text-xl font-semibold">Save Your Travel Costs</h5>
                        <p>
                            Carpool with passengers to cut down on your commuting costs every time you drive.
                            Register as a driver today and start saving on your travel expenses.
                        </p>
                    </div>


                    <div className="flex flex-col md:w-1/3 mt-4 md:pl-10 md:pr-10 md:mt-0">
                        <GrUserExpert className="text-2xl mb-2" />
                        <h5 className="text-xl font-semibold">Join a trustworthy community</h5>
                        <p>
                            Our community is built on trust. We thoroughly check ratings, profiles, and IDs
                            to ensure you know who you are sharing your journey with.
                        </p>
                    </div>


                    <div className="flex flex-col md:w-1/3 mt-4 md:pr-20 md:mt-0">
                        <GrSecure className="text-2xl mb-2" />
                        <h5 className="text-xl font-semibold">Guaranteed Privacy of Your Data</h5>
                        <p>
                            We are committed to safeguarding your personal information. Your data remains strictly
                            confidential, secured by advanced monitoring, encrypted transmissions, and safe browsing.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-xl md:text-4xl font-bold mt-12 text-center text-slate-700">Everything you need as a driver, in our Help Centre</h1>
                <div className="grid-container mt-12 ml-4 mr-4 md:ml-20 md:mr-20">
                    {faqItems}
                </div>
            </div>

            <div><Footer /></div>

        </div>
    )
}

export default OfferRide;