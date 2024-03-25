import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Paypal from "../components/Paypal";
import axiosInstance from "../axios/instance";
import ReactDOM from 'react-dom';
import { InputNumber } from 'antd';

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState(0);
    const navigate = useNavigate();
    const [checkOut, setCheckOut] = useState(false);
    let [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const { username } = useParams();
    const [userData, setUserData] = useState([]);
    let [invoiceId, setInvoiceId] = useState(0);
    const [invoice, setInvoice] = useState([]);

    const [adultCount, setAdultCount] = useState(0);
    const [olderChildrenCount, setOlderChildrenCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);
    const [babyCount, setBabyCount] = useState(0);
    const [adultPrice, setAdultPrice] = useState(0);
    const [olderChildrenPrice, setOlderChildrenPrice] = useState(0);
    const [childrenPrice, setChildrenPrice] = useState(0);
    const [babyPrice, setBabyPrice] = useState(0);
    const [remainingSeats, setRemainingSeats] = useState(0);
    const [tour, setTour] = useState([]);
    const { id } = useParams();
    const user = JSON.parse(sessionStorage.getItem("user"));

    function formatDepartureDate(departureDate) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(departureDate));
    }

    function getNearestDepartureDate(departureDays) {
        const now = new Date();
        const daysArray = Array.isArray(departureDays) ? departureDays : [departureDays];
        const upcomingDates = daysArray.filter(date => new Date(date) > now);
        const nearestDate = upcomingDates.length > 0 ? upcomingDates[0] : null;
        return nearestDate;
    }

    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/tours/${id}`)
            .then(response => {
                setTour(response.data);
                setRemainingSeats(response.data.remainingSeats);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);


    const onChangeAdult = (value) => {
        const totalPeople = value + olderChildrenCount + childrenCount + babyCount;
        if (totalPeople <= remainingSeats) {
            setAdultCount(value);
        }
        const price = (tour.discountedPrice ? tour.discountedPrice : tour.price);
        setAdultPrice(price * value);
    };

    const onChangeOlderChildren = (value) => {
        const totalPeople = value + adultCount + childrenCount + babyCount;
        if (totalPeople <= remainingSeats) {
            setOlderChildrenCount(value);
        }
        const price = (tour.discountedPrice ? (tour.discountedPrice * 0.7) : (tour.price * 0.7));
        setOlderChildrenPrice(price * value);
    };

    const onChangeChildren = (value) => {
        const totalPeople = value + adultCount + olderChildrenCount + babyCount;
        if (totalPeople <= remainingSeats) {
            setChildrenCount(value);
        }
        const price = (tour.discountedPrice ? (tour.discountedPrice * 0.4) : (tour.price * 0.4));
        setChildrenPrice(price * value);
    };

    const onChangeBaby = (value) => {
        const totalPeople = value + adultCount + olderChildrenCount + childrenCount;
        if (totalPeople <= remainingSeats) {
            setBabyCount(value);
        }
        const price = (tour.discountedPrice ? (tour.discountedPrice * 0.1) : (tour.price * 0.1));
        setBabyPrice(price * value);
    };

    // hàm tính tổng tiền hàng
    const calculateTotalPayment = () => {
        let totalPrice = 0;
        totalPrice += (adultPrice + olderChildrenPrice + childrenPrice + babyPrice);

        return totalPrice;
    };

    const vndToUsdExchangeRate = 0.00004;
    const convertVndToUsd = (vndAmount) => {
        return vndAmount * vndToUsdExchangeRate;
    };

    const handlePayment = () => {
        setCheckOut(true);
        const totalPriceInUSD = convertVndToUsd(calculateTotalPayment());
        // 1. Gửi dữ liệu đơn hàng lên máy chủ để xử lý
        const orderData = {
            ...invoice,
            userId: user.id,
            tourId: tour.id,
            totalPrice: calculateTotalPayment(),
            isPurchased: false,
            adultCount: adultCount,
            olderChildrenCount: olderChildrenCount,
            childrenCount: childrenCount,
            babyCount: babyCount,
        };

        const orderDataInUSD = {
            userId: user.id,
            totalPrice: totalPriceInUSD,
        };

        axiosInstance.post("http://localhost:5000/invoices/create-new-invoice", orderData)
            .then(response => {
                invoiceId = response.data.id;
                ReactDOM.render(
                    <Paypal orderData={orderDataInUSD}
                        onPaymentSuccess={handlePaymentSuccess} />,
                    document.getElementById('paypal-container')
                );
            })
            .catch(error => {
                console.error('Error processing payment:', error);
            });
    };

    const handlePaymentSuccess = () => {
        const orderDataForUpdate = {
            totalPrice: calculateTotalPayment(),
            isPurchased: true,
        }

        axiosInstance.patch(`http://localhost:5000/invoices/${invoiceId}`, orderDataForUpdate)
            .then(r => {
                const updatedRemainingSeats = tour.remainingSeats - (adultCount + olderChildrenCount + childrenCount + babyCount);

                axiosInstance.patch(`http://localhost:5000/tours/${tour.id}`, { remainingSeats: updatedRemainingSeats })
                    .then(tourResponse => {
                        console.log("Tour updated successfully:", tourResponse.data);
                    })
                    .catch(error => {
                        console.error("Error updating tour:", error);
                    });
                navigate(`/thông-tin-cá-nhân`);
            })

    };


    const handlePaymentMethodChange = (e) => {
        const { value } = e.target;
        setPaymentMethod(value);
        // Cập nhật giá trị invoice.paymentMethod
        setInvoice({
            ...invoice,
            paymentMethod: value,
        });
    };

    const handleDirectPayment = () => {
        const orderData = {
            ...invoice,
            userId: user.id,
            tourId: tour.id,
            totalPrice: calculateTotalPayment(),
            isPurchased: false,
            adultCount: adultCount,
            olderChildrenCount: olderChildrenCount,
            childrenCount: childrenCount,
            babyCount: babyCount,
        };

        setInvoice(prevInvoice => ({
            ...prevInvoice,
            userId: user.id,
            tourId: tour.id,
            totalPrice: calculateTotalPayment(),
            isPurchased: false,
            adultCount: adultCount,
            olderChildrenCount: olderChildrenCount,
            childrenCount: childrenCount,
            babyCount: babyCount,
        }));

        axiosInstance.post("http://localhost:5000/invoices/create-new-invoice", orderData)
            .then(r => {
                const updatedRemainingSeats = tour.remainingSeats - (adultCount + olderChildrenCount + childrenCount + babyCount);

                axiosInstance.patch(`http://localhost:5000/tours/${tour.id}`, { remainingSeats: updatedRemainingSeats })
                    .then(tourResponse => {
                        console.log("Tour updated successfully:", tourResponse.data);
                    })
                    .catch(error => {
                        console.error("Error updating tour:", error);
                    });
                navigate(`/thông-tin-cá-nhân`);
            })
    };

    return (
        <>
            <div className="checkout py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        &emsp; &emsp;
                        <div className="col-6">
                            <div className="checkout-left-data">
                                <div className='row'>
                                    <div className='col-3'>
                                        <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>Khách hàng :</h4>
                                        <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>Email :</h4>
                                        <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>Số điện thoại :</h4>
                                        <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>Tour muốn đặt :</h4>
                                    </div>
                                    <div className='col-9' style={{ marginLeft: '-35px' }}>
                                        <h4 className="product-heading-prices" style={{ fontSize: '15px' }}>{user.username} </h4>
                                        <h4 className="product-heading-prices" style={{ fontSize: '15px' }}>{user.email} </h4>
                                        <h4 className="product-heading-prices" style={{ fontSize: '15px' }}>{user.phoneNumber} </h4>
                                    </div>
                                </div>
                                <Link to={`/tour/${id}`}>
                                    <div className='row tour-booked'>
                                        <div className='col-6'>
                                            <div className="card-image">
                                                <img src={tour.imageLinks && tour.imageLinks[0]} className="imgTip"
                                                    style={{ marginLeft: '-10px', borderRadius: '5px', width: '310px', height: '170px' }} alt="blog" loading="lazy" />
                                            </div>
                                        </div>
                                        <div className='col-6' style={{ marginLeft: '-10px' }}>
                                            <h5 className="product-heading-prices"
                                                style={{
                                                    display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                    WebkitLineClamp: 3, maxHeight: '60px', textAlign: 'justify',
                                                    fontWeight: 'bold', fontSize: '16px'
                                                }}>
                                                {tour.name}
                                            </h5>
                                            <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                Thời gian: {tour.schedule}
                                            </p>
                                            <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                Khởi hành: {formatDepartureDate(getNearestDepartureDate(tour.departureDay))}
                                            </p>
                                            <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                Xuất phát từ: {tour.departureLocation}
                                            </p>
                                            <p className="product-heading-prices" style={{ margin: '3px', fontSize: '13px' }}>
                                                Số chỗ còn nhận: {tour.remainingSeats}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px', margin: '15px 0 -5px 0' }}> Phương thức thanh toán : </h4>
                                <div className="product-heading-prices">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault2"
                                            id="flexRadioDefault2"
                                            value="Thanh toán trực tiếp"
                                            checked={paymentMethod === "Thanh toán trực tiếp"}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label className="form-check-label">
                                            Thanh toán trực tiếp
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault2"
                                            id="flexRadioDefault2"
                                            value="Thanh toán qua Paypal"
                                            checked={paymentMethod === "Thanh toán qua Paypal"}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label className="form-check-label">
                                            Thanh toán qua Paypal
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault2"
                                            id="flexRadioDefault2"
                                            value="Chuyển khoản ngân hàng"
                                            checked={paymentMethod === "Chuyển khoản ngân hàng"}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label className="form-check-label">
                                            Chuyển khoản ngân hàng
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        &emsp; &emsp; &emsp;
                        <div className="col-5">
                            <div className='row' style={{ position: 'relative' }}>
                                <div className='col-5'>
                                    <h3 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                        Loại khách
                                    </h3>
                                </div>
                                <div className='col-4'>
                                    <h3 className="product-heading-prices d-flex align-items-center justify-content-center"
                                        style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                        Giá tour / khách
                                    </h3>
                                </div>
                                <div className='col-3'>
                                    <h3 className="product-heading-prices"
                                        style={{ fontWeight: 'bold', fontSize: '15px', right: '10px', position: 'absolute' }}>
                                        Số lượng
                                    </h3>
                                </div>
                            </div>
                            <div className='row' style={{ position: 'relative' }}>
                                <div className='col-5'>
                                    <h3 className="product-heading-prices">
                                        Người lớn (12 tuổi trở lên)
                                    </h3>
                                </div>
                                <div className='col-4'>
                                    <h3 className="product-heading-prices d-flex align-items-center justify-content-center">
                                        {tour.price ?
                                            (tour.discountedPrice ? tour.discountedPrice.toLocaleString() + ' VNĐ' : tour.price.toLocaleString() + ' VNĐ')
                                            : 'Price not available'}
                                    </h3>
                                </div>
                                <div className='col-3'>
                                    <InputNumber min={0} max={remainingSeats - olderChildrenCount - childrenCount - babyCount} defaultValue={0} onChange={onChangeAdult}
                                        style={{ fontSize: '12px', width: '70px', right: '10px', position: 'absolute' }} />
                                </div>
                            </div>
                            <div className='row' style={{ position: 'relative' }}>
                                <div className='col-5'>
                                    <h3 className="product-heading-prices">
                                        Trẻ em (5 đến 11 tuổi)
                                    </h3>
                                </div>
                                <div className='col-4'>
                                    <h3 className="product-heading-prices d-flex align-items-center justify-content-center">
                                        {tour.price ?
                                            (tour.discountedPrice ? (tour.discountedPrice * 0.7).toLocaleString() + ' VNĐ' : (tour.price * 0.7).toLocaleString() + ' VNĐ')
                                            : 'Price not available'}
                                    </h3>
                                </div>
                                <div className='col-3'>
                                    <InputNumber min={0} max={remainingSeats - adultCount - childrenCount - babyCount} defaultValue={0} onChange={onChangeOlderChildren}
                                        style={{ fontSize: '12px', width: '70px', right: '10px', position: 'absolute' }} />
                                </div>
                            </div>
                            <div className='row' style={{ position: 'relative' }}>
                                <div className='col-5'>
                                    <h3 className="product-heading-prices">
                                        Trẻ nhỏ (2 đến 4 tuổi)
                                    </h3>
                                </div>
                                <div className='col-4'>
                                    <h3 className="product-heading-prices d-flex align-items-center justify-content-center">
                                        {tour.price ?
                                            (tour.discountedPrice ? (tour.discountedPrice * 0.4).toLocaleString() + ' VNĐ' : (tour.price * 0.4).toLocaleString() + ' VNĐ')
                                            : 'Price not available'}
                                    </h3>
                                </div>
                                <div className='col-3'>
                                    <InputNumber min={0} max={remainingSeats - adultCount - olderChildrenCount - babyCount} defaultValue={0} onChange={onChangeChildren}
                                        style={{ fontSize: '12px', width: '70px', right: '10px', position: 'absolute' }} />
                                </div>
                            </div>
                            <div className='row' style={{ position: 'relative' }}>
                                <div className='col-5'>
                                    <h3 className="product-heading-prices">
                                        Em bé (Dưới 2 tuổi)
                                    </h3>
                                </div>
                                <div className='col-4'>
                                    <h3 className="product-heading-prices d-flex align-items-center justify-content-center">
                                        {tour.price ?
                                            (tour.discountedPrice ? (tour.discountedPrice * 0.1).toLocaleString() + ' VNĐ' : (tour.price * 0.1).toLocaleString() + ' VNĐ')
                                            : 'Price not available'}
                                    </h3>
                                </div>
                                <div className='col-3'>
                                    <InputNumber min={0} max={remainingSeats - adultCount - olderChildrenCount - childrenCount} defaultValue={0} onChange={onChangeBaby}
                                        style={{ fontSize: '12px', width: '70px', right: '10px', position: 'absolute' }} />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center" style={{ marginTop: '5px' }}>
                                <p className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}> Tổng số người</p>
                                <p className="product-heading-prices"> {adultCount + olderChildrenCount + childrenCount + babyCount} người </p>
                            </div>

                            <div className="d-flex justify-content-between align-items-center border-top py-2" style={{ marginTop: '5px' }}>
                                <h4 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}> Tổng thanh toán</h4>
                                <h5 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                    {calculateTotalPayment().toLocaleString() + ' VNĐ'}
                                </h5>
                            </div>
                            <div className="col-12 d-flex justify-content-end">
                                <div id="paypal-container"></div>
                                {paymentMethod === "Thanh toán qua Paypal" ? (
                                    <button className="btn btn-primary"
                                        onClick={handlePayment}
                                        style={{ display: checkOut ? 'none' : 'block' }}
                                    >
                                        Thanh toán
                                    </button>
                                ) : (
                                    <button className="btn btn-primary" onClick={handleDirectPayment}>
                                        Xác nhận thông tin
                                    </button>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
