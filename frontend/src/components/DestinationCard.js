import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { TiLocation } from 'react-icons/ti';

const DestinationCard = ({ destination }) => {
    return (
        <Link to={`/Du-lịch/${destination.name.replace(/\s/g, '-')}`}>
            <div className="singleDestination">
                <div className="imgDiv">
                    <img src={destination.mainImageLink} className="imgDes" alt="Destination" />
                    <div className="descInfo flex">
                        <div className="text">
                            <span className="name">
                                {destination.name}
                            </span>
                            <p className="flex" >
                                <TiLocation className='icon' /> {destination.location}
                            </p>
                        </div>
                        <span className="rating" style={{ marginTop: '50px' }}>
                            {destination.tours.length} Tour
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DestinationCard