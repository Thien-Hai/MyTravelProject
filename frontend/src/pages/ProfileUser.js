import React, { useState, useEffect } from 'react';
import axiosInstance from "../axios/instance";
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const ProfileUser = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [toursBooked, setToursBooked] = useState([]);
    const [notification, setNotification] = useState(null);
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/users/${user.id}`)
            .then(response => {
                setUserProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/invoices/get-all-invoices-by-userId/${user.id}`)
            .then(response => {
                // Sắp xếp danh sách hóa đơn theo trường createdAt giảm dần
                const sortedInvoices = response.data.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setToursBooked(sortedInvoices);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const formattedDate = date.format('dddd, DD/MM/YYYY');

        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    function getNearestDepartureDate(departureDays) {
        const now = new Date();
        const daysArray = Array.isArray(departureDays) ? departureDays : [departureDays];
        const upcomingDates = daysArray.filter(date => new Date(date) > now);
        const nearestDate = upcomingDates.length > 0 ? upcomingDates[0] : null;
        return nearestDate;
    }

    function formatDepartureDate(departureDate) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false, // Sử dụng định dạng 24 giờ
            timeZone: 'UTC'
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(departureDate));
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    const updateUserData = (userData) => {
        axiosInstance.patch(`http://localhost:5000/users/${user.id}`, userData)
            .then(response => {
                console.log("User updated successfully:", response.data);
                // window.location.reload();
                setNotification('Cập nhật thông tin cá nhân thành công');
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedUser({ username: user.username, email: user.email, phoneNumber: user.phoneNumber });
    };

    const handleSaveClick = () => {
        updateUserData(editedUser);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };
    console.log(user);

    return (
        <>
            <div className="checkout py-5 home-wrapper-2">
                {notification && (
                    <div className="notification-success">
                        {notification}
                    </div>
                )}
                <div className="container-xxl">
                    <div className="row">
                        &emsp;
                        <div style={{ width: '20%', marginRight: '10px' }}>
                            <div className='row'>
                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '22px', width: '300px', marginBottom: '0' }}>Hồ sơ người dùng</h4>
                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px', height: '27px' }}>Họ & Tên</h4>
                                <input
                                    type="text"
                                    name="username"
                                    className="input-edit-user"
                                    defaultValue={userProfile.username}
                                    readOnly={!isEditing}
                                    onChange={handleInputChange}
                                    style={{ fontSize: '15px' }}
                                />
                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px', height: '27px' }}>Email</h4>
                                <input
                                    type="text"
                                    name="email"
                                    className="input-edit-user"
                                    defaultValue={userProfile.email}
                                    readOnly={!isEditing}
                                    onChange={handleInputChange}
                                    style={{ fontSize: '15px' }}
                                />
                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px', height: '27px' }}>Số điện thoại</h4>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="input-edit-user"
                                    defaultValue={userProfile.phoneNumber}
                                    readOnly={!isEditing}
                                    onChange={handleInputChange}
                                    style={{ fontSize: '15px' }}
                                />
                                <div style={{ marginTop: '15px' }}>
                                    {isEditing ? (
                                        <>
                                            <div className='row d-flex align-items-center justify-content-center'>
                                                <button className="btn" onClick={handleSaveClick} style={{ marginLeft: '20px', fontSize: '14px', width: '100px' }}>
                                                    Lưu
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='row d-flex align-items-center justify-content-center'>
                                                <button className="btn" onClick={handleEditClick} style={{ marginLeft: '20px', fontSize: '14px', width: '100px' }}>
                                                    Chỉnh sửa
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-9 border-left" style={{ marginLeft: '30px' }}>
                            <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '22px', width: '300px', marginBottom: '0' }}>Tour đã đặt</h4>
                            {toursBooked.map((tourBooked, index) => (
                                <div key={index} className="row border-bottom py-3">
                                    <div className="col-7">
                                        <Link
                                            to={`/tour/${tourBooked.tour.id}`}
                                        >
                                            <div className='row tour-booked'>
                                                <div className='col-6'>
                                                    <div className="card-image">
                                                        <img src={tourBooked.tour.imageLinks && tourBooked.tour.imageLinks[0]} className="imgTip"
                                                            style={{ marginLeft: '-10px', borderRadius: '5px', width: '280px', height: '170px' }} alt="blog" loading="lazy" />
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <h5 className="product-heading-prices"
                                                        style={{
                                                            display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                            WebkitLineClamp: 3, maxHeight: '60px', textAlign: 'justify',
                                                            fontWeight: 'bold', fontSize: '16px'
                                                        }}>
                                                        {tourBooked.tour.name}
                                                    </h5>
                                                    <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                        Thời gian: {tourBooked.tour.schedule}
                                                    </p>
                                                    <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                        Khởi hành: {formatDepartureDate(getNearestDepartureDate(tourBooked.tour.departureDay))}
                                                    </p>
                                                    <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                        Xuất phát từ: {tourBooked.tour.departureLocation}
                                                    </p>
                                                    <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                        Số chỗ còn nhận: {tourBooked.tour.remainingSeats}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='col-5' style={{ margin: 'auto' }}>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '14px' }}> Thời gian đặt</h4>
                                                <h4 className="product-heading-prices" style={{ fontSize: '14px', marginBottom: '5px' }}> {formatDateTime(tourBooked.createdAt)} </h4>
                                            </div>
                                            <div className='col-6'>
                                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '14px' }}> Tổng thanh toán</h4>
                                                <h4 className="product-heading-prices" style={{ fontSize: '14px' }}> {tourBooked.totalPrice.toLocaleString() + ' VNĐ'} </h4>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '14px' }}> Phương thức thanh toán</h4>
                                                <h4 className="product-heading-prices" style={{ fontSize: '14px', marginRight: '-20px' }}> {tourBooked.paymentMethod} </h4>
                                            </div>
                                            <div className='col-6'>
                                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '14px' }}> Trạng thái thanh toán</h4>
                                                <h4 className="product-heading-prices" style={{ fontSize: '14px' }}>  {tourBooked.isPurchased ? 'Đã thanh toán' : 'Chưa thanh toán'} </h4>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '14px' }}> Tổng số người </h4>
                                        </div>
                                        <div className='row'>
                                            <h4 style={{ fontSize: '14px', fontWeight: '500' }}>
                                                {tourBooked.adultCount + tourBooked.olderChildrenCount + tourBooked.childrenCount + tourBooked.babyCount}
                                                &nbsp; ({tourBooked.adultCount} người lớn, {tourBooked.olderChildrenCount} trẻ em, {tourBooked.childrenCount} trẻ nhỏ, {tourBooked.babyCount} em bé)
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        &emsp; &emsp;

                    </div>
                </div >
            </div >
        </>
    );
};

export default ProfileUser;