import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Checkbox, Row, Col } from 'antd';
import QuillEditor from '../components/QuillEditor';

const AddtourAdmin = () => {
    // State cho các trường thông tin sản phẩm
    const [tourName, setTourName] = useState("");
    const [tourDesc, setTourDesc] = useState("");
    const [tourSchedule, setTourSchedule] = useState("");
    const [tourDetailedSchedule, setTourDetailedSchedule] = useState("");
    const [tourDepartureDay, setTourDepartureDay] = useState("");
    const [tourDepartureLocation, setTourDepartureLocation] = useState("");
    const [tourPrice, setTourPrice] = useState(0);
    const [tourDiscountedPrice, setTourDiscountedPrice] = useState(0);
    const [tourCode, setTourCode] = useState("");
    const [notification, setNotification] = useState(null);

    // State cho danh sách tourType và destination
    const [tourTypes, setTourTypes] = useState([]);
    const [selectedTourType, setSelectedTourType] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [destinationsForSelectedType, setDestinationsForSelectedType] = useState([]);

    // Load danh sách tourType từ API khi component được render
    useEffect(() => {
        axios.get("http://localhost:5000/tour-types/get-all-tour-types")
            .then(response => {
                setTourTypes(response.data);
            })
            .catch(error => {
                console.error("Error fetching tour types:", error);
            });
    }, []);

    const handleTourTypeChange = (e) => {
        setSelectedTourType(e.target.value);
    };

    // Cập nhật danh sách destination tương ứng với loại tour đã chọn
    useEffect(() => {
        if (selectedTourType) {
            const selectedType = tourTypes.find((type) => type.name === selectedTourType);
            if (selectedType) {
                setDestinationsForSelectedType(selectedType.destinations.map((destination) => destination.name));
            }
        }
    }, [selectedTourType, tourTypes]);

    const handleDestinationChange = (e) => {
        setSelectedDestination(e.target.value);
    };

    const handleTourNameChange = (e) => {
        setTourName(e.target.value);
    };

    // Xử lý focus cho ô giá và giá khuyến mãi, để loại bỏ số 0 ở đầu
    const handlePriceFocus = (e) => {
        const value = e.target.value;
        if (value === "0") {
            e.target.value = "";
        }
    };

    const handleDiscountedPriceFocus = (e) => {
        const value = e.target.value;
        if (value === "0") {
            e.target.value = "";
        }
    };

    const handleTourPriceChange = (e) => {
        const price = parseFloat(e.target.value);
        setTourPrice(price >= 0 ? price : 0);
    };

    const handleTourDiscountedPriceChange = (e) => {
        const discountedPrice = parseFloat(e.target.value);
        setTourDiscountedPrice(discountedPrice >= 0 ? discountedPrice : 0);
    };

    const handleTourDescChange = (e) => {
        setTourDesc(e.target.value);
    };

    const handleTourScheduleChange = (e) => {
        setTourSchedule(e.target.value);
    };

    const handleTourDetailedScheduleChange = (e) => {
        setTourDetailedSchedule(e.target.value);
    };

    const handleTourDepartureDayChange = (e) => {
        setTourDepartureDay(e.target.value);
    };

    const handleTourDepartureLocationChange = (e) => {
        setTourDepartureLocation(e.target.value);
    };

    const handleTourCodeChange = (e) => {
        setTourCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTour = {
            name: tourName,
            desc: tourDesc,
            schedule: tourSchedule,
            detailedSchedule: tourDetailedSchedule,
            departureDay: tourDepartureDay,
            departureLocation: tourDepartureLocation,
            price: tourPrice,
            discountedPrice: tourDiscountedPrice,
            tourCode: tourCode,
        };

        if (selectedTourType) {
            newTour.tourType = selectedTourType;
        }

        if (selectedDestination) {
            newTour.destination = selectedDestination;
        }

        try {
            await axios.post("http://localhost:5000/tours/create-new-tour", newTour);
            setNotification('Thêm mới tour thành công');
            setTourName("");
            setTourDesc("");
            setTourCode("");
            setTourSchedule("");
            setTourDetailedSchedule("");
            setTourDepartureDay("");
            setTourDepartureLocation("");
            setTourPrice(0);
            setTourDiscountedPrice(0);
            setSelectedTourType(null);
            setSelectedDestination(null);
        } catch (error) {
            console.error("Error: ", error.response);
            setNotification('Thêm mới tour thất bại');
        }
    };

    return (
        <div>
            <h4 className="mb-4">Thêm mới tour</h4>
            {notification && (
                <div className={`notification ${notification === 'Thêm mới tour thành công' ? 'success' : 'error'}`}>
                    {notification}
                </div>
            )}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Tên </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={tourName}
                            onChange={handleTourNameChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Mã tour </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={tourCode}
                            onChange={handleTourCodeChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Mô tả </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={tourDesc}
                            onChange={handleTourDescChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Lịch trình </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={tourSchedule}
                            onChange={handleTourScheduleChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Lịch trình chi tiết </h5>
                        </div>
                        <QuillEditor onEditorChange={handleTourDetailedScheduleChange} />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Ngày khởi hành </h5>
                        </div>
                        <input type="date"
                            className="brandname-input"
                            onChange={handleTourDepartureDayChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Địa điểm khởi hành </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={tourDepartureLocation}
                            onChange={handleTourDepartureLocationChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Giá gốc </h5>
                        </div>
                        <input type="number"
                            className="brandname-input"
                            value={tourPrice}
                            onChange={handleTourPriceChange}
                            onFocus={handlePriceFocus}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Giá khuyến mãi </h5>
                        </div>
                        <input type="number"
                            className="brandname-input"
                            value={tourDiscountedPrice}
                            onChange={handleTourDiscountedPriceChange}
                            onFocus={handleDiscountedPriceFocus}
                        />
                    </div>

                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Chọn loại tour và điểm đến </h5>
                        </div>
                        <div>
                            {tourTypes.map((type) => (
                                <div key={type.name} className="product-type-container">
                                    <label>
                                        <input
                                            type="radio"
                                            className="radio-input"
                                            value={type.name}
                                            checked={selectedTourType === type.name}
                                            onChange={handleTourTypeChange}
                                        />
                                        {type.name}
                                    </label>
                                    {selectedTourType === type.name && (
                                        <div className="brand-container">
                                            {destinationsForSelectedType.map((destination, index) => (
                                                <label key={index}>
                                                    <input
                                                        type="radio"
                                                        className="radio-input"
                                                        value={destination}
                                                        checked={selectedDestination === destination}
                                                        onChange={handleDestinationChange}
                                                    />
                                                    {destination}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Thêm mới
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddtourAdmin;
