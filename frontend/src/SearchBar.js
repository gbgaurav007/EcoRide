import React, { useState, useRef, useEffect } from "react"
import { IoLocationOutline, IoCalendarOutline, IoPersonOutline } from "react-icons/io5";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const places = [
    "Elante Mall", "Sector 17", "Rock Garden", "Tribune Chowk", "ISBT 43", "PEC",
    "Sukhna Lake", "Palika Bazaar", "Shastri Market", "PU", "GMCH 32", "I.S Bindra Stadium", "Airport, Mohali",
    "Railway Station", "Chhatbir Zoo", "Mansa Devi Temple", "Town Park, Panchkula", "Pinjore Garden",
    "Best Price, Zirakpur", "Haldirams, Derabassi"
];

function SearchBar({ searchRides }) {

    const today = new Date().toISOString().split('T')[0];

    const [leavingFrom, setLeavingFrom] = useState("");
    const [goingTo, setGoingTo] = useState("");
    const [date, setDate] = useState(today);
    const [passengers, setPassengers] = useState(1);
    const [filteredLeavingFrom, setFilteredLeavingFrom] = useState([]);
    const [filteredGoingTo, setFilteredGoingTo] = useState([]);
    const [showLeavingFromSuggestions, setShowLeavingFromSuggestions] = useState(false);
    const [showGoingToSuggestions, setShowGoingToSuggestions] = useState(false);
    const leavingFromRef = useRef(null);
    const goingToRef = useRef(null);


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


    function handleSearch() {

        const rideDetails = {
            leavingFrom,
            goingTo,
            date,
            passengers
        };

        console.log(rideDetails);

        if(!leavingFrom || !goingTo){
            alert('Please fill all the fields');
            return;
        }

        if (leavingFrom === goingTo) {
            alert('Pick-up and Drop destinations cannot be same. Please choose a different destination');
            return;
        }

        searchRides(rideDetails);

    }

    return (
        <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex w-full">
                <div className="md:flex justify-between items-center px-4 py-2 border-b border-gray-200">

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

                    <div className="hidden md:block border-l border-gray-300 h-8 mr-2"></div>
                    <div className="flex flex-1 items-center md:hidden border-t border-gray-300 my-2"></div>

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

                    <div className="hidden md:block md:border-l border-gray-300 h-8 mr-2"></div>
                    <div className="flex flex-1 items-center md:hidden border-t border-gray-300 my-2"></div>

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

                    <div className="hidden md:block border-l border-gray-300 h-8 mr-2 ml-2"></div>
                    <div className="flex flex-1 items-center md:hidden border-t border-gray-300 my-2"></div>

                    <div className="flex flex-1 items-center">
                        <IoPersonOutline className="mr-2 text-xl" />
                        <div className="flex">
                            <div className="flex items-center px-10">
                                <div className="bg-white border-none px-2">{passengers}</div>
                                <div className="text-gray-600">
                                    {passengers === 1 ? 'passenger' : 'passengers'}
                                </div>
                            </div>
                            <button onClick={handleDecrementPassenger} className="text-2xl">
                                <CiCircleMinus />
                            </button>
                            <button onClick={handleIncrementPassenger} className="text-2xl">
                                <CiCirclePlus />
                            </button>
                        </div>
                    </div>
                </div>

                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-8 rounded-r w-full" onClick={handleSearch}>
                    Search
                </button>

            </div>
        </div>
    );
}

export default SearchBar;
