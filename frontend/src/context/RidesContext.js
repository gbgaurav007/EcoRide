import React, { createContext, useContext, useState } from 'react';

const RidesContext = createContext();

export const useRides = () => useContext(RidesContext);

export const RidesProvider = ({ children }) => {
    const [bookedRides, setBookedRides] = useState([]);

    const bookRide = (ride) => {
        setBookedRides([...bookedRides, ride]);
    };

    const resetRides = () => {
        setBookedRides([]);
    }

    return (
        <RidesContext.Provider value={{ bookedRides, bookRide, resetRides }}>
            {children}
        </RidesContext.Provider>
    );
};
