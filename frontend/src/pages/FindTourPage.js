import React, { Suspense, useState, useEffect } from 'react'
// import TourCard from '../components/TourCard';

import axiosInstance from "../axios/instance";
import { Pagination, DatePicker, Empty } from 'antd';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const TourCard = React.lazy(() => import('../components/TourCard'));

const DomesticTourPage = () => {
    const pageSize = 9;
    const [currentPage, setCurrentPage] = useState(1);

    function formatDepartureDate(departureDate) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(departureDate));
    }

    const getNearestDepartureDate = (departureDays) => {
        const now = new Date();
        const daysArray = Array.isArray(departureDays) ? departureDays : [departureDays];
        const upcomingDates = daysArray.filter(date => new Date(date) > now);
        const nearestDate = upcomingDates.length > 0 ? upcomingDates[0] : null;
        return nearestDate;
    };

    const handleSortChange = (value) => {
        let sortedTours = [...tours];

        switch (value) {
            case 'price-ascending':
                sortedTours.sort((a, b) => {
                    const priceA = a.discountedPrice !== null ? a.discountedPrice : a.price;
                    const priceB = b.discountedPrice !== null ? b.discountedPrice : b.price;
                    return priceA - priceB;
                });
                break;
            case 'price-descending':
                sortedTours.sort((a, b) => {
                    const priceA = a.discountedPrice !== null ? a.discountedPrice : a.price;
                    const priceB = b.discountedPrice !== null ? b.discountedPrice : b.price;
                    return priceB - priceA;
                });
                break;
            case 'biggest-discount':
                sortedTours.sort((a, b) => {
                    const discountDiffA = a.discountedPrice !== null ? a.price - a.discountedPrice : Infinity;
                    const discountDiffB = b.discountedPrice !== null ? b.price - b.discountedPrice : Infinity;

                    if (discountDiffA !== Infinity && discountDiffB !== Infinity) {
                        return discountDiffB - discountDiffA;
                    } else {
                        return discountDiffA - discountDiffB;
                    }
                });
                break;
            case 'nearest-departure':
                sortedTours.sort((a, b) => {
                    const nearestDepartureA = getNearestDepartureDate(a.departureDay);
                    const nearestDepartureB = getNearestDepartureDate(b.departureDay);

                    return new Date(nearestDepartureA) - new Date(nearestDepartureB);
                });
                break;
            case 'biggest-discount-and-nearest-departure':
                sortedTours = sortedTours.filter((tour) => {
                    const discountDiff = tour.discountedPrice !== null ? tour.price - tour.discountedPrice : Infinity;
                    const nearestDeparture = getNearestDepartureDate(tour.departureDay);

                    return discountDiff !== Infinity && nearestDeparture !== null;
                });

                sortedTours.sort((a, b) => {
                    const nearestDepartureA = getNearestDepartureDate(a.departureDay);
                    const nearestDepartureB = getNearestDepartureDate(b.departureDay);

                    return new Date(nearestDepartureA) - new Date(nearestDepartureB);
                });
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

    const [toursVisible, setToursVisible] = useState(false);
    const [totalTours, setTotalTours] = useState(0);
    const [filteredTours, setFilteredTours] = useState([]);

    const storedDeparturePlace = sessionStorage.getItem('departurePlace');
    const storedDestination = sessionStorage.getItem('destination');
    const storedDepartureDate = sessionStorage.getItem('departureDate');

    useEffect(() => {
        setSelectedDeparture(storedDeparturePlace);
        setSelectedDestination(storedDestination);
        // setSelectedDepartureDay(storedDepartureDate);
    }, []);

    const storedBudget = sessionStorage.getItem('budget');
    const budgetRanges = {
        "Dưới 10 triệu": [0, 10000000],
        "10 đến 20 triệu": [10000000, 20000000],
        "20 đến 30 triệu": [20000000, 30000000],
        "30 đến 40 triệu": [30000000, 40000000],
        "40 đến 50 triệu": [40000000, 50000000],
        "Trên 50 triệu": [50000000, 200000000],
    };

    const [departureDate, setDepartureDate] = useState(null);

    useEffect(() => {
        if (storedBudget && budgetRanges[storedBudget]) {
            setPriceRange(budgetRanges[storedBudget]);
        }
    }, [storedBudget]);

    useEffect(() => {
        if (storedDepartureDate) {
            // Chuyển đổi định dạng từ "ngày/tháng/năm" sang "YYYY-MM-DD"
            const formattedDate = moment(storedDepartureDate, 'DD/MM/YYYY');
            setDepartureDate(formattedDate);
        }
    }, []);

    useEffect(() => {
        axiosInstance.get('http://localhost:5000/destinations')
            .then(response => {
                setDestinations(response.data);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
            });
    }, []);

    useEffect(() => {
        axiosInstance.get('http://localhost:5000/tours/get-all-tours')
            .then(response => {
                setTours(response.data);
            })
            .catch(error => {
                console.error('Error fetching all tours:', error);
            });
    }, []);

    const [priceRange, setPriceRange] = useState([0, 200000000]);
    console.log(selectedDestination);

    useEffect(() => {
        const filteredTours = tours.filter((tour) => {
            const tourPrice = tour.discountedPrice !== null ? tour.discountedPrice : tour.price;
            const priceCondition = tourPrice >= priceRange[0] && tourPrice <= priceRange[1];

            const departureCondition =
                selectedDeparture.length === 0 || tour.departureLocation === selectedDeparture;

            const destinationCondition =
                selectedDestination.length === 0 || tour.destinations.some(destination => {
                    return destination.name === selectedDestination;
                });

            const departureDayCondition =
                !selectedDepartureDay ||
                ((typeof tour.departureDay === 'string' || tour.departureDay instanceof String) &&
                    [tour.departureDay].some(departureday => formatDepartureDate(departureday) === selectedDepartureDay));

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
                return priceCondition && departureCondition && destinationCondition && departureDayCondition && peopleCountCondition && transportCondition;
            }

            return priceCondition && departureCondition && destinationCondition && departureDayCondition &&
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
            <Suspense key={tour.id} fallback={<div></div>}>
                <TourCard tour={tour} />
            </Suspense>
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
    };

    const handleDepartureDayChange = (dateString) => {
        // dateString chính là ngày được chọn, bạn có thể lưu vào state
        setSelectedDepartureDay(formatDepartureDate(dateString));
    };

    const dayRangeMap = {
        "1-3 ngày": { min: 1, max: 3 },
        "4-7 ngày": { min: 4, max: 7 },
        "8-14 ngày": { min: 8, max: 14 },
        "trên 14 ngày": { min: 15, max: Infinity },
    };

    const handleDayRangeChange = (selectedDaySchedule) => {
        // Nếu đã chọn rồi thì bỏ chọn, ngược lại thì chọn
        setSelectedDayRange((prevSelected) => (prevSelected === selectedDaySchedule ? null : selectedDaySchedule));
    };

    const peopleCountMap = {
        "1 người": { min: 1 },
        "2 người": { min: 2 },
        "3-5 người": { min: 5 },
        "trên 5 người": { min: 6 },
    };

    const handlePeopleCountChange = (selectedPeopleCount) => {
        setSelectedPeopleCount((prevSelected) => (prevSelected === selectedPeopleCount ? null : selectedPeopleCount));
    };

    const handleTransportChange = (transport) => {
        setSelectedTransport((prevSelected) => (prevSelected === transport ? null : transport));
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
                                                <option key={index} value={place} selected={place === storedDeparturePlace}>
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
                                                .map((destination) => (
                                                    <option key={destination.id} value={destination.name} selected={destination.name === storedDestination}>
                                                        {destination.name}
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
                                            value={departureDate}
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
                                    <div className="d-flex justify-content-between align-items-center" style={{ position: 'relative' }}>
                                        <div className="d-flex align-items-center gap-10">
                                            <p className="filter-title"
                                                style={{ marginTop: '0', marginBottom: '0', marginLeft: '4px', width: '120px' }}> Sắp xếp theo </p>
                                            <select className="form-control form-select" style={{ width: '230px' }}
                                                id="" onChange={(e) => handleSortChange(e.target.value)}>
                                                <option value="manual"> Mặc định </option>
                                                <option value="price-ascending"> Giá, thấp đến cao </option>
                                                <option value="price-descending"> Giá, cao về thấp </option>
                                                <option value="biggest-discount"> Giảm giá nhiều nhất </option>
                                                <option value="nearest-departure"> Ngày khởi hành gần nhất </option>
                                                <option value="biggest-discount-and-nearest-departure"> Ưu đãi giờ chót </option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center gap-10" >
                                            <p className="filter-title totalproducts"> {totalTours} Tour </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tour-introduce">
                                    <div className="title"> Kết quả tìm kiếm tour </div>
                                    <br />
                                </div>
                                <div className="products-list pb-5" >
                                    {toursVisible ? (
                                        <div className="d-flex gap-10 flex-wrap mx-2" style={{ zoom: '0.85' }}>
                                            {visibleTourCards}
                                        </div>
                                    ) : (
                                        <Empty description="Không có dữ liệu" style={{ marginTop: '150px' }} />
                                    )}
                                </div>

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

export default DomesticTourPage
