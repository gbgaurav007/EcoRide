import React from "react";
import { FaPhone, FaCarRear } from "react-icons/fa6";
import { GoDot } from "react-icons/go";

function BookedRide({ ride }) {
    return (
        <div className="bg-white py-5 px-10 shadow-lg rounded-xl mt-7 w-1/2 transition ease-in-out delay-80 hover:scale-102 hover:-translate-y-1 mx-auto">
            <div className="flex-col">
                <div className="md:flex justify-between">
                    <div>
                        <p className="text-lg font-bold">{ride.time}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex">
                            <p className="text-lg font-bold">Rs. {ride.price}</p>&nbsp;
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
                        <img src={`livePhoto-${ride.driverContact}.jpeg`} className="h-20 w-20 rounded-full" />
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
            </div>
        </div>
    )
}

export default BookedRide;