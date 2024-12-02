import React from 'react';
import { TiSocialFacebookCircular, TiSocialInstagram, TiSocialTwitterCircular, TiSocialYoutube } from "react-icons/ti"

function Footer() {
  return (
    <footer className="bg-gray-200 py-6 text-slate-800 mt-20">
      <div className="mx-auto px-2">
        <div className="flex md:flex-row flex-col ml-20">
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0 md:ml-20">
            <div className="mb-6">
              <h6 className="text-lg font-semibold mb-4">Top Carpool Routes</h6>
              <ul className="text-sm">
                <li>Elante Mall - Sector 17 Market</li>
                <li>ISBT 43 - Railway Station</li>
                <li>Tribune Chowk - Airport, Mohali</li>
                <li>I.S Bindra Stadium - Sukhna Lake</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="mb-6">
              <h6 className="text-lg font-semibold mb-4">About</h6>
              <ul className="text-sm">
                <li>How it works</li>
                <li>About us</li>
                <li>Help Centre</li>
                <li>Account</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="mb-6">
              <h6 className="text-lg font-semibold mb-4">Follow Us</h6>
              <ul className="text-4xl flex flex-row">
                <li><TiSocialFacebookCircular/></li>
                <li><TiSocialInstagram/></li>
                <li><TiSocialTwitterCircular/></li>
                <li><TiSocialYoutube/></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
