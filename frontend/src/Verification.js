import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import './App.css';
import { useNavigate } from 'react-router-dom';

const Verification = ({ onVerify }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aadharCard: null,
    carName: '',
    carNo: '',
    livePhoto: null
  });

  const [verificationStatus, setVerificationStatus] = useState('');
  const [liveCaptureInProgress, setLiveCaptureInProgress] = useState(false);
  const [showCapturedPhoto, setShowCapturedPhoto] = useState(null);
  const [photoSaved, setPhotoSaved] = useState(false);
  const videoRef = useRef(null);



  const handleVerification = async () => {

    if (!formData.carName || !formData.carNo || !formData.aadharCard || !formData.livePhoto) {
      setVerificationStatus('Please fill in all the fields');
      return;
    }

    const details = {
      carName: formData.carName,
      carNo: formData.carNo,
      livePhoto: formData.livePhoto
    }

    const newData = new FormData();
    newData.append('carName', formData.carName);
    newData.append('carNo', formData.carNo);
    newData.append('livePhoto', formData.livePhoto);

    console.log(newData);

    try {

      const response = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        body: newData,
        credentials: 'include'
      });

      const data = await response.json();

      if (data.code === 201) {
        alert("Profile verified successfully.");
        onVerify(details);
        navigate('/offer');
      } else {
        setVerificationStatus('Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationStatus('Verification failed. Please try again.');
    }
  };



  const handleLivePhotoCapture = async () => {
    try {
      const constraints = {
        video: true
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      setLiveCaptureInProgress(true);
      setShowCapturedPhoto(null);
    } catch (error) {
      console.error('Live photo capture failed:', error);
    }
  };



  const handleCaptureClick = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const photoURL = URL.createObjectURL(blob);
      setFormData({ ...formData, livePhoto: blob });
      setShowCapturedPhoto(photoURL);
    }, 'image/jpeg');
    setLiveCaptureInProgress(false);
    //setShowCapturedPhoto(true);
    setPhotoSaved(false);
  };



  const handleRetakeClick = () => {

    if (showCapturedPhoto) {
      URL.revokeObjectURL(showCapturedPhoto);
    }
    setFormData({ ...formData, livePhoto: null });
    setShowCapturedPhoto(null);
    setLiveCaptureInProgress(true);
    setPhotoSaved(false);
  };


  const handleAadharCardUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, aadharCard: file });
  };

  function validateCarNo(carNo) {
    const re = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
    return re.test(String(carNo));
  }

  const [errors, setErrors] = useState({});

  const handleCarNoChange = (e) => {
    setFormData({ ...formData, carNo: e.target.value });

    let newErrors = { ...errors };
    newErrors.carNo = validateCarNo(e.target.value) ? '' : 'Car number should be XX 00 XX 0000.'
    setErrors(newErrors);
  }

  return (
    <div className="flex flex-col mb-20" id="verify">
      <Navbar />
      <div className="flex flex-col md:flex-row mt-20 md:ml-10">
        <div className="flex-col">
          <h1 className="text-3xl font-bold md:mt-10 mt-10 ml-5 md:ml-12 text-slate-800">Verify Your Profile!</h1>
          <h2 className="text-md font-bold md:mt-2 ml-5 md:ml-12 text-slate-800">YOU'RE JUST ONE STEP AWAY!!</h2>
          <img src="ver.png" alt='logo' className="w-auto h-45 md:w-auto md:h-80 mt-4 md:mt-8" />
        </div>
        <div className="w-3/4 md:w-1/4 md:mt-10 flex flex-col md:ml-20 ml-8 mt-5">
          <div className="verification-details mx-auto">
            <h2 className="text-xl mb-4 text-white bg-green-500 py-2 px-4 text-center font-bold rounded">Verification Details</h2>

            <div className="credential py-2">
              <label className="font-semibold">Live Photo:&nbsp;&nbsp;</label>
              {liveCaptureInProgress ? (
                <div className="flex space-x-2 mt-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCaptureClick}>Capture</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLivePhotoCapture}>Cancel</button>
                </div>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleLivePhotoCapture}>Start Live Capture</button>
              )}
              <video ref={videoRef} autoPlay muted style={{ display: 'block', marginTop: '10px' }} className="mt-2 rounded" />
            </div>

            {showCapturedPhoto && (
              <div className="credential py-2">
                <label className="font-semibold">Live Photo Preview:</label>
                <img src={showCapturedPhoto} alt="Captured Photo" className="block mt-2 w-24 h-auto rounded" />
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleRetakeClick}>Retake</button>
                {photoSaved && <span className="text-green-500 ml-2">✔ Photo Saved</span>}
              </div>
            )}

            <div className="credential py-2">
              <label htmlFor="carName" className="font-semibold">Car Name:</label>
              <input
                type="text"
                id="carName"
                placeholder="Your Car Name"
                value={formData.carName}
                onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="credential py-2">
              <label htmlFor="carNo" className="font-semibold">Car Number:</label>
              <input
                type="text"
                id="carNo"
                placeholder="Your Car Number"
                value={formData.carNo}
                onChange={handleCarNoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.carNo && <p style={{ color: 'red', fontSize: '14px', width: 'full' }}>{errors.carNo}</p>}
            </div>

            <div className="credential py-2">
              <label htmlFor="aadharCard" className="font-semibold">Aadhar Card:</label>
              <input
                type="file"
                id="aadharCard"
                accept="image/*"
                onChange={handleAadharCardUpload}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer shadow-sm text-gray-700"
              />
            </div>

            <button className="verification-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleVerification}>Verify Profile</button>
            {verificationStatus && <p className="mt-2" style={{ color: 'red' }}>{verificationStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;

