import React, { useState } from 'react';
import Home from './Home';
import Search from './Search';
import OfferRide from './OfferRide';
import Account from './Account';
import Faq from './Faq';
import MyRides from './MyRides';
import Profile from './Profile';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Verification from './Verification';

function App() {

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUserData(userData);
    console.log("userData", userData);
    navigate('/');
  }

  const handleProfileVerification = (details) => {
    if (userData) {
      setUserData({ ...userData, isDriver: true, carName: details.carName, carNo: details.carNo, livePhoto: details.livePhoto });
      navigate('/offer');
    }

  }

  const determineOfferElement = () => {
    if (userData) {
      return userData.isDriver ? <OfferRide userData={userData}/> : <Verification onVerify={handleProfileVerification} />;
    }
  };

  return (
    <div className="App">
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/offer" element={determineOfferElement()}/>
          <Route path="/account" element={<Account onLogin={handleLogin} />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/myrides" element={<MyRides />} />
          <Route path="/profile" element={<Profile userData={userData} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
