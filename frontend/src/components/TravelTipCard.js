import React from 'react';
import { Link } from 'react-router-dom';

const TravelTipCard = ({ travelTip }) => {
    return (
        <Link to={`/tin-tức/${travelTip.name.replace(/\s/g, '-')}`}>
            <div className="singleTravelTip">
                <div className="imgDiv">
                    <img src={travelTip.mainImageLink} className="imgTip" alt="Travel Tip" />
                </div>
                <div className="infoDiv">
                    <span className="name">
                        {travelTip.name}
                    </span>
                    <p className="category">
                        {travelTip.category}
                    </p>
                    <p className="desc">
                        {travelTip.desc}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default TravelTipCard;
