import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from "../axios/instance";
import { useParams } from 'react-router-dom';
import QuillEditor from '../components/QuillEditor';
import { DatePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const EditTourAdmin = () => {
    const { id } = useParams();
    const [notification, setNotification] = useState(null);
    const [tour, setTour] = useState([]);
    const [departureDay, setDepartureDay] = useState([]);

    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/tours/${id}`)
            .then(response => {
                setTour(response.data);
                setDepartureDay(response.data.departureDay);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    dayjs.locale('vi');
    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const formattedDate = date.format('YYYY-MM-DD');

        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    // // Hàm xử lý khi nội dung QuillEditor thay đổi
    const handleEditorChange = (content) => {
        setTour({
            ...tour,
            departureDay: departureDay,
            detailedSchedule: content
        });
    };

    // // Hàm xử lý khi ấn nút "Cập nhật tour"
    const handleUpdateTour = (e) => {
        e.preventDefault();

        // Lấy ra các trường dữ liệu cần cập nhật từ state tour
        const { name, desc, schedule, departureLocation, price, discountedPrice, tourCode, transport, hotel,
            suitableUser } = tour;

        const updatedTour = {
            name,
            desc,
            schedule,
            detailedSchedule: tour.detailedSchedule,
            departureLocation,
            price,
            discountedPrice,
            tourCode,
            transport,
            hotel,
            suitableUser
        };

        axios
            .patch(`http://localhost:5000/tours/${id}`, updatedTour)
            .then(() => {
                setNotification('Cập nhật tour thành công');
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật dữ liệu tour:', error);
                setNotification('Cập nhật tour không thành công');
            });
    };

    const disabledDate = (current) => {
        // Ngăn chọn ngày trước hiện tại
        return current && current < moment().startOf('day');
    };

    return (
        <div>
            <h3 className="mb-4">Cập nhật tour</h3>
            {notification && (
                <div className={`notification ${notification === 'Cập nhật tour thành công' ? 'success' : 'error'}`}>
                    {notification}
                </div>
            )}
            <div className="">
                <form onSubmit={handleUpdateTour}>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title">Cập nhật tên</h5>
                        </div>
                        <input
                            type="text"
                            className="brandname-input"
                            value={tour.name}
                            onChange={(e) => setTour({ ...tour, name: e.target.value })}
                        />
                    </div>
                    <div className='row'>
                        <div className='col-4'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật mã tour</h5>
                                </div>
                                <input
                                    type="text"
                                    className="brandname-input"
                                    value={tour.tourCode}
                                    onChange={(e) => setTour({ ...tour, tourCode: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật giá gốc</h5>
                                </div>
                                <input
                                    type="number"
                                    className="brandname-input"
                                    value={tour.price}
                                    onChange={(e) => setTour({ ...tour, price: parseFloat(e.target.value) >= 0 ? parseFloat(e.target.value) : 0 })}
                                />
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật giá khuyến mãi</h5>
                                </div>
                                <input
                                    type="number"
                                    className="brandname-input"
                                    value={tour.discountedPrice}
                                    onChange={(e) => setTour({ ...tour, discountedPrice: parseFloat(e.target.value) >= 0 ? parseFloat(e.target.value) : 0 })}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật lịch trình</h5>
                                </div>
                                <input
                                    type="text"
                                    className="brandname-input"
                                    value={tour.schedule}
                                    onChange={(e) => setTour({ ...tour, schedule: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật phương tiện di chuyển</h5>
                                </div>
                                <input
                                    type="text"
                                    className="brandname-input"
                                    value={tour.transport}
                                    onChange={(e) => setTour({ ...tour, transport: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật ngày khởi hành</h5>
                                </div>
                                <input
                                    type="text"
                                    className="brandname-input"
                                    value={formatDateTime(departureDay)}
                                    onChange={(e) => setTour({ ...tour, departureDay: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật địa điểm khởi hành</h5>
                                </div>
                                <input
                                    type="text"
                                    className="brandname-input"
                                    value={tour.departureLocation}
                                    onChange={(e) => setTour({ ...tour, departureLocation: e.target.value })}
                                />
                            </div>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật nơi nghỉ ngơi</h5>
                                </div>
                                <input
                                    type="text"
                                    className="brandname-input"
                                    value={tour.hotel}
                                    onChange={(e) => setTour({ ...tour, hotel: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="category-wrapper">
                                <div className="category-header">
                                    <h5 className="sub-title">Cập nhật đối tượng thích hợp</h5>
                                </div>
                                <input
                                    type="text"
                                    className="brandname-input"
                                    value={tour.suitableUser}
                                    onChange={(e) => setTour({ ...tour, suitableUser: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title">Cập nhật lịch trình chi tiết</h5>
                        </div>
                        <QuillEditor value={tour.detailedSchedule} onEditorChange={handleEditorChange} />
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <button className="btn btn-success mt-3" type="submit" style={{ fontSize: '18px' }}>
                            Cập nhật tour
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTourAdmin;
