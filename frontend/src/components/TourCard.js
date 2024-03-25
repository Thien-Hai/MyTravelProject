import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { BiTime } from 'react-icons/bi';
import { AiFillSchedule } from 'react-icons/ai';
import { FaRegCalendarAlt, FaLocationArrow, FaMoneyBill } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';

const TourCard = ({ tour }) => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const user = JSON.parse(sessionStorage.getItem("user"));
    let isLogin = false;

    if (user && typeof user === "object") {
        // Nếu đối tượng user tồn tại và là một đối tượng
        isLogin = true;
    }

    const departureDate = new Date(getNearestDepartureDate(tour.departureDay)); // Replace this with your actual departure date
    const [countdown, setCountdown] = useState(calculateCountdown());

    function formatTwoDigits(value) {
        return value < 10 ? `0${value}` : value;
    }

    function formatDepartureDate(departureDate) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(departureDate));
    }

    function calculateCountdown() {
        const now = new Date();
        const timeDiff = departureDate - now;

        if (timeDiff <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return {
            days: formatTwoDigits(days),
            hours: formatTwoDigits(hours),
            minutes: formatTwoDigits(minutes),
            seconds: formatTwoDigits(seconds),
        };
    }

    function getNearestDepartureDate(departureDays) {
        const now = new Date();
        const daysArray = Array.isArray(departureDays) ? departureDays : [departureDays];
        const upcomingDates = daysArray.filter(date => new Date(date) > now);
        const nearestDate = upcomingDates.length > 0 ? upcomingDates[0] : null;
        return nearestDate;
    }

    function handleBookTour() {
        if (isLogin) {
            navigate(`/đặt-tour/${tour.id}`);
        } else {
            setNotification('Vui lòng đăng nhập để đặt tour');
        }
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            setCountdown(calculateCountdown());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <Link to={`/tour/${tour.id}`}>
            {notification && (
                <div className="notification-note">
                    {notification}
                </div>
            )}
            <div className="blog-card">
                <div className="card-image">
                    <img src={tour.imageLinks && tour.imageLinks[0]} className="img-fluid" alt="blog" loading="lazy" />
                </div>
                <div className="blog-content">
                    <p className="date">
                        <BiTime className='icon-blogcard' />
                        Còn {countdown.days} ngày {countdown.hours}:
                        {countdown.minutes}:{countdown.seconds}
                    </p>
                    <h5 className="title" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 3, maxHeight: '60px', textAlign: 'justify' }}>
                        {tour.name}
                    </h5>
                    <p className="desc">
                        <FaRegCalendarAlt className='icon-blogcard' /> Thời gian: {tour.schedule}
                    </p>
                    <p className="desc">
                        <AiFillSchedule className='icon-blogcard' /> Khởi hành: {formatDepartureDate(getNearestDepartureDate(tour.departureDay))}
                    </p>
                    <p className="desc">
                        <FaLocationArrow className='icon-blogcard' /> Xuất phát từ: {tour.departureLocation}
                    </p>
                    <p className="desc">
                        <FiUserPlus className='icon-blogcard' /> Số chỗ còn nhận: {tour.remainingSeats}
                    </p>
                    <p className="desc">
                        <FaMoneyBill className='icon-blogcard' />
                        Giá:
                        <div style={{ marginTop: '-1%', marginLeft: '1.5%', textAlign: 'center' }}>
                            <span style={{ color: 'red', fontSize: '18px' }}>
                                {tour.discountedPrice ? tour.discountedPrice.toLocaleString() + ' VNĐ' : tour.price.toLocaleString() + ' VNĐ'}
                                {tour.discountedPrice && (
                                    <strike>
                                        {tour.price.toLocaleString() + ' VNĐ'}
                                    </strike>
                                )}
                            </span>
                        </div>
                    </p>
                </div>
                <button onClick={handleBookTour} className="button-blogcard"> Đặt ngay </button>
            </div>
        </Link>
    );
};

export default TourCard;
