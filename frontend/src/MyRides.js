import React, {useEffect} from "react";
import Navbar from "./Navbar";
import { useRides } from './RidesContext';
import BookedRide from "./BookedRide";

function MyRides() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const { bookedRides } = useRides();

    return (
        <div className="flex flex-col text-center">
            <div><Navbar /></div>
            <div className="bg-white h-10"></div>

            {bookedRides.length > 0 ? (

                <>
                    <h2 className="text-2xl font-bold text-center my-4 mt-10">Booked Rides</h2>
                    <div className="booked-rides-list">
                        {bookedRides.map(ride => (
                            <BookedRide key={ride._id} ride={ride} />
                        ))}
                    </div>
                </>

            ) : (

                <div className="flex flex-col text-center md:mt-10">
                    <img src="mr.jpg" alt="img" className="h-60 w-60 mt-5 mx-auto" />
                    <h1 className="text-4xl text-slate-700 font-bold mt-5">Your future travel plans will appear here!</h1>
                </div>

            )}
        </div>
    )
}

export default MyRides;