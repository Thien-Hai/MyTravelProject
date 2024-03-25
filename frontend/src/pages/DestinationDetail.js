import React, { useState, useEffect } from 'react'
import TourCard from '../components/TourCard';
import axiosInstance from "../axios/instance";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination, DatePicker, Empty, Spin } from 'antd';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const TourTypeDetail = () => {
    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    function formatDepartureDate(departureDate) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(departureDate));
    }

    const handleSortChange = (value) => {
        let sortedTours = [...tours];

        switch (value) {
            case 'title-ascending':
                sortedTours.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'title-descending':
                sortedTours.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-ascending':
                sortedTours.sort((a, b) => a.discountedPrice - b.discountedPrice);
                break;
            case 'price-descending':
                sortedTours.sort((a, b) => b.discountedPrice - a.discountedPrice);
                break;
            case 'ranking-ascending':
                sortedTours.sort((a, b) => a.stars - b.stars);
                break;
            case 'ranking-descending':
                sortedTours.sort((a, b) => b.stars - a.stars);
                break;
            default:
                break;
        }

        setTours(sortedTours);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;

    const [destinations, setDestinations] = useState([]);
    const [tours, setTours] = useState([]);
    const [selectedDeparture, setSelectedDeparture] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState([]);
    const [selectedDepartureDay, setSelectedDepartureDay] = useState(null);
    const [selectedDayRange, setSelectedDayRange] = useState(null);
    const [selectedPeopleCount, setSelectedPeopleCount] = useState(null);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const { destinationName } = useParams();

    const [destination, setDestination] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    const [toursVisible, setToursVisible] = useState(false);
    const [totalTours, setTotalTours] = useState(0);
    const [filteredTours, setFilteredTours] = useState([]);

    useEffect(() => {
        // Decode tên tour trước khi gửi yêu cầu API
        const decodedDestinationName = destinationName.replace(/-/g, ' ');

        axiosInstance.get(`http://localhost:5000/destinations`)
            .then(response => {
                const allDestinations = response.data;
                setDestinations(allDestinations);
                const destination = response.data.find(destination => destination.name === decodedDestinationName);
                if (destination) {
                    setDestination(destination);
                    setDestinationId(destination.id);
                }
            })
            .catch(error => {
                console.error('Error fetching destination:', error);
            });
    }, [destinationName]);

    useEffect(() => {
        if (destinationId !== null) {
            axiosInstance.get(`http://localhost:5000/destinations/${destinationId}`)
                .then(response => {
                    const allTours = response.data.tours;
                    setTours(allTours);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching tour type:', error);
                    setLoading(false);
                });
        }
    }, [destinationId]);

    const [priceRange, setPriceRange] = useState([0, 200000000]);

    useEffect(() => {
        const filteredTours = tours.filter((tour) => {
            const tourPrice = tour.discountedPrice !== null ? tour.discountedPrice : tour.price;
            const priceCondition = tourPrice >= priceRange[0] && tourPrice <= priceRange[1];

            const departureCondition =
                selectedDeparture.length === 0 || tour.departureLocation === selectedDeparture;

            const departureDayCondition = !selectedDepartureDay || tour.departureDay.some(departureday => {
                return formatDepartureDate(departureday) == selectedDepartureDay;
            });;

            const dayRangeValues = dayRangeMap[selectedDayRange];
            const scheduleCondition = dayRangeValues
                ? tour.schedule && tour.schedule.match(/\d+/) // Lấy số đầu tiên từ chuỗi
                : null;

            const peopleCountValues = peopleCountMap[selectedPeopleCount];
            const peopleCountCondition = peopleCountValues
                ? tour.remainingSeats !== null && tour.remainingSeats >= peopleCountValues.min
                : true;

            const transportCondition = selectedTransport
                ? tour.transport &&
                (selectedTransport === "Máy bay & Ô tô" && tour.transport.includes("Máy bay"))
                || (selectedTransport === "Ô tô" && tour.transport === "Ô tô du lịch")
                : true;

            if (!selectedDayRange) {
                return priceCondition && departureCondition && departureDayCondition && peopleCountCondition && transportCondition;
            }

            return priceCondition && departureCondition && departureDayCondition &&
                (scheduleCondition !== null) && (scheduleCondition >= dayRangeValues.min) && (scheduleCondition <= dayRangeValues.max) &&
                peopleCountCondition && transportCondition;

        });

        setFilteredTours(filteredTours);
        setToursVisible(filteredTours.length > 0);
        setTotalTours(filteredTours.length);

        setCurrentPage(1);
    }, [tours, priceRange, selectedDeparture, selectedDestination, selectedDepartureDay, selectedDayRange, selectedPeopleCount, selectedTransport]);

    const visibleTourCards = filteredTours
        .slice(startIndex, endIndex)
        .map(tour => (
            <TourCard key={tour.id} tour={tour} />
        ));

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

    const handleSliderChange = (value) => {
        setPriceRange(value);
    };

    const handleDepartureChange = (value) => {
        setSelectedDeparture(value);
    };

    const handleDestinationChange = (value) => {
        setSelectedDestination(value);
        navigate(`/Du-lịch/${value.replace(/\s/g, '-')}`);
    };

    const handleDepartureDayChange = (dateString) => {
        setSelectedDepartureDay(formatDepartureDate(dateString));
    };

    const dayRangeMap = {
        "1-3 ngày": { min: 1, max: 3 },
        "4-7 ngày": { min: 4, max: 7 },
        "8-14 ngày": { min: 8, max: 14 },
        "trên 14 ngày": { min: 15, max: Infinity },
    };

    const handleDayRangeChange = (selectedDaySchedule) => {
        setSelectedDayRange(selectedDaySchedule);
    };

    const peopleCountMap = {
        "1 người": { min: 1 },
        "2 người": { min: 2 },
        "3-5 người": { min: 5 },
        "trên 5 người": { min: 6 },
    };

    const handlePeopleCountChange = (selectedPeopleCount) => {
        setSelectedPeopleCount(selectedPeopleCount);
    };

    const handleTransportChange = (transport) => {
        setSelectedTransport(transport);
    };

    const disabledDate = (current) => {
        // Ngăn chọn ngày trước hiện tại
        return current && current < moment().startOf('day');
    };

    return (
        <>
            <div className="tourType">
                <div className="store-wrapper home-wrapper-2 py-5">
                    <div className="container-xxl">
                        <div className="row justify-content-center" style={{ marginLeft: '-2.5%' }}>
                            <div className='col-3'>
                                <div className="filter-card mb-3">
                                    <h2 className="filter-product"> Lọc tour </h2>
                                    <div>
                                        <h5 className="filter-title"> Giá </h5>
                                        <div>
                                            <Slider
                                                range
                                                min={0}
                                                max={200000000}
                                                step={5000000}
                                                defaultValue={[0, 200000000]}
                                                pushable={5000000}
                                                value={priceRange}
                                                onChange={handleSliderChange}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            <span> {priceRange[0].toLocaleString() + ' VNĐ'}</span>
                                            <span style={{ marginLeft: 'auto' }}> {priceRange[1].toLocaleString() + ' VNĐ'}</span>
                                        </div>
                                    </div>

                                    <h3 className="filter-title"> Điểm đi </h3>
                                    <div>
                                        <select
                                            onChange={(e) => handleDepartureChange(e.target.value)}
                                            className="form-control form-select"
                                        >
                                            <option value="">Chọn điểm đi</option>
                                            {departurePlaces.map((place, index) => (
                                                <option key={index} value={place}>
                                                    {place}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <h3 className="filter-title"> Điểm đến </h3>
                                    <div >
                                        <select
                                            onChange={(e) => handleDestinationChange(e.target.value)}
                                            className="form-control form-select"
                                        >
                                            <option value="">Chọn điểm đến</option>
                                            {destinations && destinations
                                                .sort((a, b) => a.id - b.id)
                                                .map((dest) => (
                                                    <option key={dest.id} value={dest.name} selected={dest.name === destinationName.replace(/-/g, ' ')}>
                                                        {dest.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <h3 className="filter-title"> Ngày khởi hành </h3>
                                    <div>
                                        <DatePicker
                                            placeholder="Chọn ngày khởi hành"
                                            disabledDate={disabledDate}
                                            onChange={handleDepartureDayChange}
                                            className="form-control"
                                        />
                                    </div>

                                    <h3 className="filter-title"> Số ngày </h3>
                                    <div className="rectangle-container">
                                        {["1-3 ngày", "4-7 ngày", "8-14 ngày", "trên 14 ngày"].map((dayRange, index) => (
                                            <div
                                                key={index}
                                                className={`rectangle ${selectedDayRange === dayRange ? 'selected' : ''}`}
                                                onClick={() => handleDayRangeChange(dayRange)}
                                            >
                                                {dayRange}
                                            </div>
                                        ))}
                                    </div>

                                    <h3 className="filter-title"> Số người </h3>
                                    <div className="rectangle-container">
                                        {["1 người", "2 người", "3-5 người", "trên 5 người"].map((peopleCount, index) => (
                                            <div key={index}
                                                className={`rectangle ${selectedPeopleCount === peopleCount ? 'selected' : ''}`}
                                                onClick={() => handlePeopleCountChange(peopleCount)}>
                                                {peopleCount}
                                            </div>
                                        ))}
                                    </div>

                                    <h3 className="filter-title"> Phương tiện di chuyển </h3>
                                    <div className="rectangle-container">
                                        {["Máy bay & Ô tô", "Ô tô"].map((transport, index) => (
                                            <div key={index}
                                                className={`rectangle ${selectedTransport === transport ? 'selected' : ''}`}
                                                onClick={() => handleTransportChange(transport)}>
                                                {transport}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='col-9' style={{ marginRight: '-5%' }}>
                                <div className="filter-sort-grid mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-10">
                                            <p className="filter-title"
                                                style={{ marginTop: '0', marginBottom: '0', marginLeft: '4px', width: '120px' }}> Sắp xếp theo </p>
                                            <select className="form-control form-select" style={{ width: '220px' }}
                                                id="" onChange={(e) => handleSortChange(e.target.value)}>
                                                <option value="manual"> Mặc định </option>
                                                <option value="price-ascending"> Giá, thấp đến cao </option>
                                                <option value="price-descending"> Giá, cao đến thấp </option>
                                                <option value="ranking-ascending"> Giảm giá nhiều nhất </option>
                                                <option value="ranking-descending"> Ngày khởi hành gần nhất </option>
                                                <option value="ranking-descending"> Ưu đãi giờ chót </option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center gap-10" >
                                            {loading ? (
                                                <p></p>
                                            ) : (
                                                <p className="filter-title totalproducts"> {totalTours} Tour </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {loading ? (
                                    <div style={{ marginTop: '200px', color: 'red' }} >
                                        <Spin tip="Đang tải dữ liệu..." size="large">
                                            <div className="content" />
                                        </Spin>
                                    </div>
                                ) : (
                                    <>
                                        <div className="tour-introduce">
                                            <div className="title"> {destination && destination.name} </div>
                                            <div className="introduce"> {destination && destination.desc} </div>
                                        </div>
                                        <div className="products-list pb-5">
                                            {toursVisible ? (
                                                <div className="d-flex gap-10 flex-wrap mx-2" style={{ zoom: '0.85' }}>
                                                    {visibleTourCards}
                                                </div>
                                            ) : (
                                                <Empty description="Không có dữ liệu" style={{ marginTop: '150px' }} />
                                            )}
                                        </div>
                                    </>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {toursVisible && (
                                        <Pagination
                                            current={currentPage}
                                            onChange={handlePageChange}
                                            total={totalTours}
                                            pageSize={pageSize}
                                            showSizeChanger={false}
                                        />
                                    )}
                                </div>
                            </div>
                        </div >
                    </div >

                </div >
            </div>
        </>
    )
}

export default TourTypeDetail
