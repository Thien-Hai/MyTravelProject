import React, { useState, useEffect } from 'react'
import axiosInstance from "../axios/instance";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import ReactHtmlParser from 'react-html-parser';

const TravelTipDetail = () => {
    const { travelTipName } = useParams();
    const [travelTip, setTravelTip] = useState(null);

    dayjs.locale('vi');
    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const formattedDate = date.format('DD-MM-YYYY');

        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    useEffect(() => {
        // Decode tên tour trước khi gửi yêu cầu API
        const decodedTravelTipName = travelTipName.replace(/-/g, ' ');

        axiosInstance.get(`http://localhost:5000/travelTips`)
            .then(response => {
                const traveltip = response.data.find(tip => tip.name === decodedTravelTipName);
                if (traveltip) {
                    setTravelTip(traveltip);
                }
            })
            .catch(error => {
                console.error('Error fetching travelTip:', error);
            });
    }, [travelTipName]);

    const renderImagesAndText = (text) => {
        const regex = /(https?:\/\/[^\s]+)/g;
        const matches = text.match(regex);

        if (matches && matches.length > 0) {
            const parts = text.split(regex);
            const elements = [];
            parts.forEach((part, index) => {
                // Bỏ qua nếu là đường link ảnh
                if (index % 2 === 0) {
                    elements.push(<div key={`text-${index}`}
                        style={{ fontSize: '16px', fontWeight: '500', textAlign: 'justify' }}>{part}</div>);
                } else {
                    elements.push(<img key={`image-${index}`} src={part} alt={`image-${index}`}
                        className='mt-3 my-3'
                        style={{ maxWidth: '65%', height: 'auto', margin: 'auto', display: 'block' }} />);
                }
            });

            return <div className="image-container">{elements}</div>;
        }

        return <div className="text-content">{text}</div>;
    };

    return (
        <>
            <div className="contact-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="travelTip-container">
                            <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>{travelTip && travelTip.name}</h2>
                            <h5 className="row mt-3" style={{ fontSize: '16px', marginLeft: '-3px' }}>
                                <div className='col-2' style={{ fontWeight: 'bold', color: 'hsl(14, 90%, 53%)' }}> {travelTip && travelTip.category} </div>
                                <div className='col-2'> {travelTip && formatDateTime(travelTip.createdAt)} </div>
                            </h5>
                            <div className="bg-white p-2 mt-4">
                                {/* Giữ nguyên văn bản và hiển thị ảnh từ đường link */}
                                {travelTip && renderImagesAndText(travelTip.detail)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TravelTipDetail