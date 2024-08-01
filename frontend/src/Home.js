import React, {useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { IoCheckmarkCircleOutline, IoPeopleOutline, IoServerOutline } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

function Home() {

    const [showAllRides, setShowAllRides] = useState(false);

    const toggleRidesDisplay = () => {
        setShowAllRides(!showAllRides);
    };

    const navigate = useNavigate();
    function moveToOffer() {
        navigate('/offer');
    }

    function moveToFAQ() {
        navigate('/faq');
    }

    const rides = [
        { id:1, from: "Elante Mall", to: "Sector 17 Market"}, { id:2, from: "ISBT 43", to: "Railway Station"},
        { id:3, from: "Tribune Chowk", to: "Airport, Mohali"}, { id:4, from: "I.S Bindra Stadium", to: "Sukhna Lake"},
        { id:5, from: "Shastri Market", to: "PU"}, { id:6, from: "PEC", to: "Tribune Chowk"},
        { id:7, from: "ISBT 43", to: "Airport, Mohali"}, { id:8, from: "Mansa Devi Temple", to: "Rock Garden"},
        { id:9, from: "Sukhna Lake", to: "Chhatbir Zoo"}, { id:10, from: "Palika Bazaar", to: "Shastri Market"},
        { id:11, from: "Best Price, Zirakpur", to: "Haldirams, Derabassi"}, { id:12, from: "Town Park", to: "Elante Mall"}
    ];

    return (
        <div className="flex-col">
            <div><Navbar /></div>

            <div className="relative">
                <img src="home_img.jpg" alt="Background" className="w-full hidden md:block mt-1" style={{ height: 'auto' }} />
                <div className="bg-emerald-100 h-80 md:hidden flex items-center justify-center text-center"></div>
                <div className="absolute top-1/3 md:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-cyan-900">
                    <h3 className="text-2xl md:text-4xl font-bold md:whitespace-nowrap mt-6">Discover pocket friendly rides!</h3>
                </div>
            </div>

            <div className="bg-white h-20 md:h-5"></div>

            <div className="flex flex-col md:flex-row justify-between mt-8 px-4 md:px-0 md:mb-10">

                <div className="flex flex-col md:w-1/3 md:pl-20">
                    <IoServerOutline className="text-2xl mb-2" />
                    <h5 className="text-xl font-semibold">Discover Pocket-Friendly Rides!</h5>
                    <p>
                        Whether you're headed near or far, find the perfect ride that suits your budget.
                        Explore an extensive range of destinations and routes, offering affordable travel
                        options by carpool.
                    </p>
                </div>


                <div className="flex flex-col md:w-1/3 mt-4 md:pl-10 md:pr-10 md:mt-0">
                    <IoPeopleOutline className="text-2xl mb-2" />
                    <h5 className="text-xl font-semibold">Trust who you travel with!</h5>
                    <p>
                        Your safety and peace of mind are our top priorities. From meticulous reviews to
                        thorough profile and ID checks, you can book your ride securely on our platform,
                        knowing exactly who you're traveling with.
                    </p>
                </div>


                <div className="flex flex-col md:w-1/3 mt-4 md:pr-20 md:mt-0">
                    <IoCheckmarkCircleOutline className="text-2xl mb-2" />
                    <h5 className="text-xl font-semibold">Booking Made Effortless!</h5>
                    <p>
                        With our intuitive app powered by advanced technology, booking your next ride
                        is as easy as a few scrolls, clicks, or taps. Experience the convenience of
                        booking a ride close to you within minutes.
                    </p>
                </div>
            </div>

            <div className="bg-emerald-400 p-4 mt-14 md:flex">
                <div className="md:w-1/3 md:mr-4 mb-4 md:mb-0 md:flex md:items-center md:justify-center md:ml-20">
                    <img src="img1.png" alt="offer" className="max-w-sm md:w-auto" />
                </div>

                <div className="md:w-5/12 md:flex md:flex-col md:justify-center md:ml-20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 mt-3 text-white">Driving in your car soon?</h2>
                    <p className="text-sm md:text-base mb-4 text-white">
                        Got a spare seat? Offer it up and be part of our connected community. Share the ride,
                        share the fun! Simply sign up, list your ride details, and watch as passengers eager
                        to share the journey with you connect.
                    </p>
                    <button className="bg-white hover:bg-opacity-90 text-emerald-600 font-bold py-2 px-4 rounded" style={{ width: 'fit-content' }} onClick={moveToOffer}>Offer Now</button>
                </div>
            </div>

            <div className="p-4 mt-14 md:flex">

                <div className="md:hidden md:w-1/3 md:mr-4 mb-4 md:mb-0 md:flex md:items-center md:justify-center md:ml-20">
                    <img src="img2.jpg" alt="offer" className="max-w-sm md:w-auto" />
                </div>

                <div className="md:w-5/12 md:flex md:flex-col md:justify-center md:ml-20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 mt-3">Need Assistance? We're Here to Help!</h2>
                    <p className="text-sm md:text-base mb-4">
                        Have questions or need support? Our Help Center is here to guide you every step of the way.
                        From booking your ride to troubleshooting any issues, our comprehensive resources are
                        designed to ensure a seamless experience for you. Click below to explore our Help Center.
                    </p>
                    <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" style={{ width: 'fit-content' }} onClick={moveToFAQ}>Explore our Help Centre</button>
                </div>

                <div className="hidden md:w-1/3 md:mr-4 mb-4 md:mb-0 md:flex md:items-center md:justify-center md:ml-20">
                    <img src="img2.jpg" alt="offer" className="max-w-sm md:w-auto" />
                </div>
            </div>

            <div className="bg-emerald-900 p-8 mt-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">See our most popular rides!</h2>
                <div className="flex flex-wrap">
                    {rides.slice(0, showAllRides ? rides.length : 3).map((ride, index) => (
                        <div key={ride.id} className="w-full md:w-1/3">
                            <button className="bg-gray-100 p-4 rounded-md mb-5 hover:bg-gray-200" style={{width : "80%"}}>{ride.from} - {ride.to}</button>
                        </div>
                    ))}
                </div>
                <div className="text-right mr-10">
                    {!showAllRides ? (
                        <button onClick={toggleRidesDisplay} className="text-emerald-200 font-bold">more...</button>
                    ) : (
                        <button onClick={toggleRidesDisplay} className="text-emerald-200 font-bold">less...</button>
                    )}
                </div>
            </div>

            <div><Footer /></div>

        </div>
    )
}

export default Home;