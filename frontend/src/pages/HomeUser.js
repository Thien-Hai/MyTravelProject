import React, { useState, useEffect } from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import { BsFillCreditCardFill, BsFillCalendarDateFill } from 'react-icons/bs';
import { SiYourtraveldottv } from 'react-icons/si';
import { AiTwotoneCustomerService, AiOutlineDollar, AiOutlineLaptop } from 'react-icons/ai';
import { TbFileLike } from "react-icons/tb";
import { FaCcAmazonPay } from "react-icons/fa";
import moment from 'moment';
import { DatePicker } from 'antd';

import Aos from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import TourCard from '../components/TourCard';
import DestinationCard from '../components/DestinationCard';
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
    const [couterOn, setCouterOn] = useState(false);

    const [tours, setTours] = useState([]);
    const [destinations, setDestinations] = useState([]);

    function formatDepartureDate(departureDate) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(departureDate));
    }

    useEffect(() => {
        axios.get('http://localhost:5000/tours/get-all-tours')
            .then(response => {
                setTours(response.data);
            })
            .catch(error => {
                console.error('Error fetching tours:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/destinations')
            .then(response => {
                setDestinations(response.data);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
            });
    }, []);

    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])

    const filteredDestination = destinations.sort((a, b) => b.tours.length - a.tours.length);

    const [departurePlaces, setDeparturePlaces] = useState([
        "Hà Nội",
        "Hải Phòng",
        "Đà Nẵng",
        "Đà Lạt",
        "Nha Trang",
        "TP.Hồ Chí Minh",
        "Rạch Giá",
        "Cần Thơ",
        "Cà Mau",
        "Phú Quốc"
    ]);

    const [budgets, setBudgets] = useState([
        "Dưới 10 triệu",
        "10 đến 20 triệu",
        "20 đến 30 triệu",
        "30 đến 40 triệu",
        "40 đến 50 triệu",
        "Trên 50 triệu",
    ]);

    const disabledDate = (current) => {
        // Ngăn chọn ngày trước hiện tại
        return current && current < moment().startOf('day');
    };

    const [departurePlace, setDeparturePlace] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState(null);
    const [budget, setBudget] = useState('');

    // Effect để lưu giá trị vào sessionStorage khi giá trị thay đổi
    useEffect(() => {
        sessionStorage.setItem('departurePlace', departurePlace);
    }, [departurePlace]);

    useEffect(() => {
        sessionStorage.setItem('destination', destination);
    }, [destination]);

    useEffect(() => {
        sessionStorage.setItem('departureDate', departureDate);
    }, [departureDate]);

    useEffect(() => {
        sessionStorage.setItem('budget', budget);
    }, [budget]);

    const handleDeparturePlaceChange = (value) => {
        setDeparturePlace(value);
    };

    const handleDestinationChange = (value) => {
        setDestination(value);
    };

    const handleDepartureDayChange = (dateString) => {
        setDepartureDate(formatDepartureDate(dateString));
    };

    const handleBudgetChange = (value) => {
        setBudget(value);
    };

    return (
        <>
            <div className="home">
                <div className="videoBg">
                    <video src="images/Video1.mp4" autoPlay loop muted
                        className="vd"> </video>
                </div>

                <div className="sectionText" style={{ marginTop: '50px' }}>
                    <h1 className="text1" data-aos="fade-up"> Mở ra giấc mơ du lịch của bạn với chúng tôi !</h1>
                    {/* <p className="text2" data-aos="fade-up"> Discover the world ... </p> */}
                    <br></br>
                    <Link to="/tất-cả-tour">
                        <button className="text3 btn" data-aos="fade-up">
                            KHÁM PHÁ NGAY
                        </button>
                    </Link>
                </div>
            </div>

            <div className="middle section">
                <div className="secContainer container">
                    <ScrollTrigger onEnter={() => setCouterOn(true)} onExit={() => setCouterOn(false)}>
                        <div className="grid">
                            <span className="flex">
                                <h1 className="text1">
                                    {couterOn && <CountUp start={0} end={500} duration={2} delay={0.05} />}+
                                </h1>
                                <p className="text2"> Tour du lịch</p>
                            </span>
                            <span className="flex">
                                <h1 className="text1">
                                    {couterOn && <CountUp start={0} end={200} duration={2} delay={0.5} />}+
                                </h1>
                                <p className="text2"> Điểm đến khác nhau</p>
                            </span>
                            <span className="flex">
                                <h1 className="text1">
                                    {couterOn && <CountUp start={0} end={10} duration={3} delay={0.5} />}K+
                                </h1>
                                <p className="text2"> Phản hồi tốt từ khách hàng</p>
                            </span>
                        </div>
                    </ScrollTrigger>
                </div>
            </div>

            <div className="home" style={{ height: '160px' }}>
                <div className="destination section container">
                    <div className="secContainer">
                        <div className="secTitle">
                            <h3 className='text1' data-aos="fade-up"> TÌM KIẾM TOUR DU LỊCH MƠ ƯỚC CỦA BẠN</h3>
                        </div>
                        <div className="searchField grid">
                            <div data-aos="fade-up" className='d-flex'>
                                <select
                                    value={departurePlace}
                                    onChange={(e) => handleDeparturePlaceChange(e.target.value)}
                                    className="inputField flex"
                                    style={{
                                        border: 'none', outline: 'none', width: '250px', height: '45px',
                                        paddingLeft: '10px', fontSize: '16px'
                                    }}
                                >
                                    <option value="">Điểm đi</option>
                                    {departurePlaces.map((place, index) => (
                                        <option key={index} value={place}>
                                            {place}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div data-aos="fade-up" className='d-flex'>
                                <select
                                    value={destination}
                                    onChange={(e) => handleDestinationChange(e.target.value)}
                                    className="inputField flex"
                                    style={{
                                        border: 'none', outline: 'none', width: '250px',
                                        height: '45px', paddingLeft: '10px', fontSize: '16px'
                                    }}
                                >
                                    <option value=""> Điểm đến</option>
                                    {destinations
                                        .sort((a, b) => a.id - b.id)
                                        .map((destination) => (
                                            <option key={destination.id} value={destination.name}>
                                                {destination.name}
                                            </option>
                                        ))}
                                </select>

                            </div>
                            <div data-aos="fade-up" className='d-flex'>
                                <div>
                                    <DatePicker
                                        // value={departureDate}
                                        placeholder="Ngày khởi hành"
                                        disabledDate={disabledDate}
                                        onChange={handleDepartureDayChange}
                                        className="inputField flex"
                                        style={{
                                            border: 'none', outline: 'none', width: '250px', height: '45px', paddingLeft: '10px'
                                        }}
                                    />
                                </div>
                            </div>
                            <div data-aos="fade-up" className='d-flex'>
                                <select
                                    value={budget}
                                    onChange={(e) => handleBudgetChange(e.target.value)}
                                    className="inputField flex"
                                    style={{
                                        border: 'none', outline: 'none', width: '250px', height: '45px',
                                        paddingLeft: '10px', fontSize: '16px'
                                    }}
                                >
                                    <option value=""> Ngân sách</option>
                                    {budgets.map((budget, index) => (
                                        <option key={index} value={budget}>
                                            {budget}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Link to="/tìm-kiếm-tour">
                                <button className="btn flex" data-aos="fade-up">
                                    <BiSearchAlt className='icon' /> Tìm kiếm
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="destination section container">
                <div className="secContainer">
                    <div data-aos="fade-up"
                        style={{
                            backgroundImage: 'url("images/BG3.jpg")',
                            backgroundSize: 'cover',
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100vw',
                            height: '900px',
                            marginLeft: '-8%',
                            marginTop: '50px',
                        }}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div style={{ fontSize: '22px', fontWeight: '500', color: 'hsl(242, 94%, 14%)', marginTop: '80px' }}
                                data-aos="fade-up">
                                Chúng tôi giới thiệu đến bạn
                            </div>
                            <div className="text2" data-aos="fade-up"> TOUR ĐANG GiẢM GIÁ </div>
                        </div>
                        <div className="row" data-aos="fade-up" style={{ marginLeft: '2%', marginRight: '2%', zoom: '0.98' }}>
                            {tours
                                .filter(tour => tour.discountedPrice)
                                .slice(0, 4).map(tour => (
                                    <div key={tour.id} className="col-3">
                                        <TourCard tour={tour} />
                                    </div>
                                ))}
                        </div>
                        <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '15px' }}>
                            <Link to="/tour-giảm-giá">
                                <button className="btn" data-aos="fade-up">
                                    <div className="view-more-button ">
                                        XEM TẤT CẢ
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div data-aos="fade-up"
                        style={{
                            backgroundImage: 'url("images/bg1.jpg")',
                            backgroundSize: 'cover',
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100vw',
                            height: '900px',
                            marginLeft: '-8%',
                            marginTop: '50px',
                        }}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div style={{ fontSize: '22px', fontWeight: '500', color: 'hsl(242, 94%, 14%)', marginTop: '80px' }}
                                data-aos="fade-up">
                                Khám phá lịch sử - văn hóa - con người Việt Nam với
                            </div>
                            <div className="text2" data-aos="fade-up"> TOUR TRONG NƯỚC </div>
                        </div>
                        <div className="row" data-aos="fade-up" style={{ marginLeft: '2%', marginRight: '2%', zoom: '0.98' }}>
                            {tours
                                .filter(tour => tour.id < 80)
                                .slice(0, 4).map(tour => (
                                    <div key={tour.id} className="col-3">
                                        <TourCard tour={tour} />
                                    </div>
                                ))}
                        </div>
                        <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '15px' }}>
                            <Link to="/tour-trong-nước">
                                <button className="btn" data-aos="fade-up">
                                    <div className="view-more-button ">
                                        XEM TẤT CẢ
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div data-aos="fade-up"
                        style={{
                            backgroundImage: 'url("images/bg2.jpg")',
                            backgroundSize: 'cover',
                            position: 'relative',
                            overflow: 'hidden',
                            width: '100vw',
                            height: '900px',
                            marginLeft: '-8%',
                            marginTop: '50px',
                        }}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div style={{ fontSize: '22px', fontWeight: '500', color: 'hsl(242, 94%, 14%)', marginTop: '80px' }}
                                data-aos="fade-up">
                                Khám phá lịch sử - văn hóa thế giới với
                            </div>
                            <div className="text2" data-aos="fade-up"> TOUR NƯỚC NGOÀI </div>
                        </div>
                        <div className="row" data-aos="fade-up" style={{ marginLeft: '2%', marginRight: '2%', zoom: '0.98' }}>
                            {tours
                                .filter(tour => tour.id > 80)
                                .slice(0, 4).map(tour => (
                                    <div key={tour.id} className="col-3">
                                        <TourCard tour={tour} />
                                    </div>
                                ))}
                        </div>
                        <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '15px' }}>
                            <Link to="/tour-nước-ngoài">
                                <button className="btn" data-aos="fade-up">
                                    <div className="view-more-button ">
                                        XEM TẤT CẢ
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="text2 d-flex justify-content-center align-items-center"
                        style={{ marginTop: '70px' }} data-aos="fade-up"> ĐIỂM ĐẾN NỔI BẬT </div>
                    <div className="destinationContainer grid" data-aos="fade-up" style={{ marginLeft: '-5%', marginRight: '-5%' }}>
                        {filteredDestination.slice(0, 5).map(destination => (
                            <div key={destination.id}>
                                <DestinationCard destination={destination} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="portifolio section container">
                <div className="secContainer grid">
                    <div className="secHeading" data-aos="fade-up">
                        <h3 className="d-flex justify-content-center align-items-center"
                            style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '-25px', marginLeft: '-55px', color: 'hsl(242, 94%, 14%)' }}> Vì sao nên chọn H-Travel</h3>
                    </div>

                    <div className="row grid" data-aos="fade-up" style={{ marginLeft: '3%' }}>
                        <div className="col-4 singlePortifolio d-flex align-items-center"
                            style={{ width: '450px', color: 'hsl(242, 94%, 14%)' }}>
                            <div className="iconDiv">
                                <AiOutlineLaptop className='icon' />
                            </div>
                            <div className="info" style={{ marginLeft: '-10px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}> Mạng lưới bán tour </h4>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>
                                    Đầu tiên tại Việt Nam <br />
                                    Ứng dụng công nghệ mới
                                </p>
                            </div>
                        </div>
                        <div className="col-4 singlePortifolio d-flex align-items-center"
                            style={{ width: '450px', color: 'hsl(242, 94%, 14%)' }}>
                            <div className="iconDiv">
                                <AiOutlineDollar className='icon' />
                            </div>
                            <div className="info" style={{ marginLeft: '-10px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}> Giá cả </h4>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>
                                    Luôn có mức giá tốt nhất
                                </p>
                            </div>
                        </div>
                        <div className="col-4 singlePortifolio d-flex align-items-center"
                            style={{ width: '450px', color: 'hsl(242, 94%, 14%)' }}>
                            <div className="iconDiv">
                                <TbFileLike className='icon' />
                            </div>
                            <div className="info" style={{ marginLeft: '-10px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}> Sản phẩm và dịch vụ </h4>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>
                                    Đa dạng - Chất lượng - An toàn
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row grid" data-aos="fade-up" style={{ marginLeft: '3%' }}>
                        <div className="col-4 singlePortifolio d-flex align-items-center"
                            style={{ width: '450px', color: 'hsl(242, 94%, 14%)' }}>
                            <div className="iconDiv">
                                <SiYourtraveldottv className='icon' />
                            </div>
                            <div className="info" style={{ marginLeft: '-10px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}> Đặt tour </h4>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>
                                    Dễ dàng và nhanh chóng
                                </p>
                            </div>
                        </div>
                        <div className="col-4 singlePortifolio d-flex align-items-center"
                            style={{ width: '450px', color: 'hsl(242, 94%, 14%)' }}>
                            <div className="iconDiv">
                                <FaCcAmazonPay className='icon' />
                            </div>
                            <div className="info" style={{ marginLeft: '-10px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}> Thanh toán </h4>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>
                                    An toàn và linh hoạt
                                </p>
                            </div>
                        </div>
                        <div className="col-4 singlePortifolio d-flex align-items-center"
                            style={{ width: '450px', color: 'hsl(242, 94%, 14%)' }}>
                            <div className="iconDiv">
                                <AiTwotoneCustomerService className='icon' />
                            </div>
                            <div className="info" style={{ marginLeft: '-10px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}> Hỗ trợ </h4>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>
                                    Hotline & trực tuyến <br /> (08h00 - 22h00)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home