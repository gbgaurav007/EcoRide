import React from "react";
import { FaPhone, FaCarRear } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import { useRides } from './RidesContext';

function RideDetails({ ride }) {

    const imgPath = `livePhoto-${ride.driverContact}.jpeg`;
    const { bookRide } = useRides();

    function handleBookRide(){
        
        alert('Your ride has been booked successfully!')
        bookRide(ride);

    }

    return (
        <div>
            <div className="bg-white py-5 px-10 shadow-lg rounded-xl mt-7 w-full transition ease-in-out delay-80 hover:scale-102 hover:-translate-y-1">
                <div className="flex-col">
                    <div className="md:flex justify-between">
                        <div>
                            <p className="text-lg font-bold">{ride.time}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex">
                                <p className="text-lg font-bold">Rs. {ride.price}</p>&nbsp;
                                <p>/seat</p></div>
                            <div>
                                <div>{ride.passengers} seats available</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col items-center text-lg py-4">
                        <div className="flex">
                            <GoDot className="mr-2 text-lg mt-1" />{ride.leavingFrom}
                        </div>
                        <div className="border-l-2 border-gray-600 h-12 ml-2"></div>
                        <div className="flex">
                            <GoDot className="mr-2 text-lg mt-1" />{ride.goingTo}
                        </div>
                    </div>
                    <div className="md:flex justify-between">
                        <div className="flex md:py-4 mt-4">
                            <img src={imgPath} className="h-20 w-20 rounded-full" />
                            <div className="flex-col p-4">
                                <p>{ride.driverName}</p>
                                <div className="flex text-gray-800">
                                    <FaPhone className="mt-1 mr-2" /><p>{ride.driverContact}</p>
                                </div>
                            </div>
                        </div>
                        <div className="items-end flex py-8">
                            <FaCarRear className="mr-4 text-5xl" />
                            <div className="flex-col">
                                <div>{ride.driverCarName}</div>
                                <div>{ride.driverCarNo}</div>
                            </div>
                        </div>
                    </div>
                    <div className="md:py-4">
                        <button className="bg-emerald-800 hover:bg-emerald-600 text-white font-bold py-2 px-8 rounded w-auto" onClick={handleBookRide}>Book</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RideDetails;