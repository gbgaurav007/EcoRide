import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import RideDetails from "./RideDetails";
import { IoTimeOutline } from "react-icons/io5";
import { TbStackPush, TbStackPop } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";

function Search() {

    const [rides, setRides] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    const [originalRides, setOriginalRides] = useState([]);

    const searchRides = async (rideDetails) => {

        setSearchPerformed(true);

        try {
            const response = await fetch('http://localhost:3000/searchRides', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rideDetails),
                credentials: 'include'
            });
            const data = await response.json();
            if (data.code === 200) {
                setRides(data.rides);
                setOriginalRides([...data.rides]);
            } else {
                console.error('Failed to fetch rides:', data.msg);
            }
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString();
        let year = date.getFullYear().toString();

        day = day.padStart(2, '0');
        month = month.padStart(2, '0');

        return `${day}-${month}-${year}`;
    }


    const sortRides = (criteria) => {
        let sortedRides = [...rides];
        switch (criteria) {
            case 'earliest':
                sortedRides.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
                break;
            case 'priceLowHigh':
                sortedRides.sort((a, b) => a.price - b.price);
                break;
            case 'priceHighLow':
                sortedRides.sort((a, b) => b.price - a.price);
                break;
            case 'moreSeats':
                sortedRides.sort((a, b) => b.passengers - a.passengers);
                break;
            default:
                break;
        }
        setRides(sortedRides);
    };


    useEffect(() => {
        if (sortCriteria) {
            sortRides(sortCriteria);
        }
    }, [sortCriteria]);


    const clearAllSorts = () => {
        setRides([...originalRides]);
    };


    return (
        <div className="flex flex-col">
            <div className="mb-5"><Navbar /></div>
            <div className="bg-white h-20"></div>
            <h2 className="text-slate-800 font-bold md:text-4xl text-2xl text-center">Find a Ride</h2>
            <div className="mt-10 px-12 mb-4"><SearchBar searchRides={searchRides} /></div>
            {searchPerformed ? (
                <div className="md:flex bg-gray-100">
                    <div className="md:w-1/4 w-full p-10">
                        {searchPerformed && rides.length > 0 && (
                            <div className="flex-col py-3">
                                <div className="flex flex-1 justify-between py-3">
                                    <p className="text-slate-800 font-bold text-2xl">Sort by:</p>
                                    <p className="text-emerald-600 text-md font-bold hover:underline cursor-pointer mt-2" onClick={clearAllSorts}>Clear all</p>
                                </div>
                                <div className="flex py-3">
                                    <label className="flex">
                                        <IoTimeOutline className="text-2xl mt-1" />
                                        <p className="text-slate-800 text-lg px-3">Earliest Departure</p>&nbsp;
                                        <input type="radio" name="sort" className="mt-2 h-4 w-4 ml-5" onChange={() => setSortCriteria('earliest')} checked={sortCriteria === 'earliest'} />
                                    </label>
                                </div>
                                <div className="flex py-3">
                                    <label className="flex">
                                        <TbStackPush className="text-2xl mt-1" />
                                        <p className="text-slate-800 text-lg px-3">Price: Low to High</p>
                                        <input type="radio" name="sort" className="mt-2 h-4 w-4 ml-5" onChange={() => setSortCriteria('priceLowHigh')} checked={sortCriteria === 'priceLowHigh'} />
                                    </label>
                                </div>
                                <div className="flex py-3">
                                    <label className="flex">
                                        <TbStackPop className="text-2xl mt-1" />
                                        <p className="text-slate-800 text-lg px-3">Price: High to Low</p>
                                        <input type="radio" name="sort" className="mt-2 h-4 w-4 ml-5" onChange={() => setSortCriteria('priceHighLow')} checked={sortCriteria === 'priceHighLow'} />
                                    </label>
                                </div>
                                <div className="flex py-3">
                                    <label className="flex">
                                        <MdPersonAddAlt className="text-2xl mt-1" />
                                        <p className="text-slate-800 text-lg px-3">More Seats Available</p>
                                        <input type="radio" name="sort" className="mt-2 h-4 w-4" onChange={() => setSortCriteria('moreSeats')} checked={sortCriteria === 'moreSeats'} />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="md:w-3/4 w-full">
                        {searchPerformed ? (
                            rides.length === 0 ? (
                                <div className="md:mt-12 md:ml-20 mx-auto">
                                    <p className="text-gray-800 text-xl font-bold ml-10">No rides found! Search for a different ride!</p>
                                    <img src="img4.png" alt="img" className="h-60 w-auto mt-5 ml-10 mb-20" />
                                </div>
                            ) : (
                                <div className="p-10">
                                    <p className="text-slate-700 text-xl font-bold">{formatDate(rides[0].date)}</p>
                                    <p className="text-gray-500 text-md font-bold">{rides.length} {rides.length === 1 ? 'ride available' : 'rides available'}</p>
                                    {rides.map((ride) => (
                                        <RideDetails key={ride._id} ride={ride} />
                                    ))}
                                </div>
                            )
                        ) : null}
                    </div>
                </div>) : null}
        </div>
    );
}

export default Search;
