import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import questions from "../data/faq";
import '../App.css';

function Faq() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [expandedItems, setExpandedItems] = useState({});

    const toggleContent = (id) => {
        setExpandedItems((prevExpandedItems) => ({
            ...prevExpandedItems,
            [id]: !prevExpandedItems[id],
        }));
    };

    const faqItems = questions.map((item) => (
        <div className="container" key={item.id}>
            <h2 className="text-base md:text-xl font-bold text-slate-700">{item.ques}</h2>
            <p className={`content ${expandedItems[item.id] ? 'expanded' : ''}`}>
                {item.ans}
            </p>
            {expandedItems[item.id] ? (
                <a><button
                    className="read-more-btn"
                    onClick={() => toggleContent(item.id)}
                >
                    read less
                </button></a>
            ) : (
                <a><button
                    className="read-more-btn"
                    onClick={() => toggleContent(item.id)}
                >
                    read more
                </button></a>
            )}
            <hr className="mt-4 border-gray-300" />
        </div>
    ));

    return (
        <div className="faq">
            <div>
                <h1 className="text-xl md:text-3xl font-bold mt-20 text-center text-slate-700">Ecoride Help Centre</h1>
                <div className="grid-container mt-12 ml-4 mr-4 md:ml-20 md:mr-20">
                    {faqItems}
                </div>
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Faq;