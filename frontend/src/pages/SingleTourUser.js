import React, { useEffect } from 'react'
import { useState } from 'react';
import axiosInstance from "../axios/instance";
import { useParams, useNavigate } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import TourCard from '../components/TourCard';
import { DownOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { IoTime } from "react-icons/io5";
import { FaUserCheck, FaHotel, FaPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { toast } from 'react-toastify';

const titles = [
    "Giá tour bao gồm",
    "Giá tour không bao gồm",
    "Giá vé trẻ em",
    "Điều kiện thanh toán",
    "Lưu ý khi chuyển / hủy tour",
    "Các điều kiện hủy tour đối với ngày thường",
    "Các điều kiện hủy tour đối với ngày Lễ Tết",
    "Trường hợp bất khả kháng"
];

const details = [
    "- Xe tham quan (15, 25, 35, 45 chỗ tùy theo số lượng khách) theo chương trình.\n - Vé máy bay khứ hồi.\n - Khách sạn tương đương 4 sao theo tiêu chuẩn 2 khách/phòng hoặc 3 khách/phòng.",
    "- Chi phí cá nhân : ăn uống ngoài chương trình, giặt ủi, chi phí hủy đổi hành trình và nâng hạng chuyến bay, hành lý quá cước, phụ thu phòng đơn,… \n - Tham quan ngoài chương trình : cáp treo Fansipan, cáp treo Yên Tử, thuyền kayak, Bảo Tháp, …",
    "- Trẻ em dưới 5 tuổi: không thu phí dịch vụ, bố mẹ tự lo cho bé và thanh toán các chi phí phát sinh (đối với các dịch vụ tính phí theo chiều cao…). Hai người lớn chỉ được kèm 1 trẻ em dưới 5 tuổi, trẻ em thứ 2 sẽ đóng phí theo qui định dành cho độ tuổi từ 5 đến dưới 12 tuổi và phụ thu phòng đơn. Vé máy bay, tàu hỏa, phương tiện vận chuyển công cộng mua vé theo qui định của các đơn vị vận chuyển. \n - Trẻ em từ 5 tuổi đến dưới 12 tuổi: 70% giá tour người lớn (không có chế độ giường riêng). Hai người lớn chỉ được kèm 1 trẻ em từ 5 - dưới 12 tuổi, em thứ hai trở lên phải mua 1 suất giường đơn. \n - Trẻ em từ 12 tuổi trở lên: mua một vé như người lớn \n - Vé máy bay phải mua theo quy định của từng hãng hàng không",
    "Hình ảnh rõ của hành khách phải giống với hình trên hộ chiếu/CMND (1 trang hình). Việc không tuân thủ điều này có thể làm hủy tour và không được hoàn tiền.",
    "- Sau khi đóng tiền, nếu Quý khách muốn chuyển/huỷ tour xin vui lòng đến văn phòng đăng ký tour để làm thủ tục chuyển/huỷ tour và chịu mất phí theo quy định của Vietravel. Không giải quyết các trường hợp liên hệ chuyển/huỷ tour qua điện thoại. \n - Thời gian hủy chuyến du lịch được tính cho ngày làm việc, không tính thứ 7, Chủ Nhật và các ngày Lễ, Tết.",
    "- Được chuyển sang các tuyến du lịch khác trước ngày khởi hành 20 ngày: Không mất chi phí. \n - Nếu hủy hoặc chuyển sang các chuyến du lịch khác ngay sau khi đăng ký từ 15-19 ngày trước ngày khởi hành: Chi phí hủy tour: 50% tiền cọc tour. \n - Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 12-14 ngày trước ngày khởi hành: Chi phí hủy tour: 100% tiền cọc tour. \n - Nếu hủy chuyến du lịch trong vòng từ 08-11 ngày trước ngày khởi hành: Chi phí hủy tour: 50% trên giá tour du lịch. \n - Nếu hủy chuyến du lịch trong vòng từ 05-07 ngày trước ngày khởi hành: Chi phí hủy tour: 70% trên giá tour du lịch. \n Nếu hủy chuyến du lịch trong vòng từ 02-04 ngày trước ngày khởi hành: Chi phí hủy tour: 90% trên giá vé du lịch. \n - Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành : Chi phí hủy tour: 100% trên giá vé du lịch.",
    "Được chuyển sang các tuyến du lịch khác trước ngày khởi hành 30 ngày : Không mất chi phí. \ n - Nếu hủy hoặc chuyển sang các chuyến du lịch khác ngay sau khi đăng ký từ 25-29 ngày trước ngày khởi hành: Chi phí hủy tour: 50% tiền cọc tour. \n -Nếu hủy hoặc chuyển sang các chuyến du lịch khác từ 20-24 ngày trước ngày khởi hành: Chi phí hủy tour: 100% tiền cọc tour. \n - Nếu hủy chuyến du lịch trong vòng từ 17-19 ngày trước ngày khởi hành: Chi phí hủy tour: 50% trên giá tour du lịch. \n - Nếu hủy chuyến du lịch trong vòng từ 08-16 ngày trước ngày khởi hành: Chi phí hủy tour: 70% trên giá tour du lịch. \n - Nếu hủy chuyến du lịch trong vòng từ 02-07 ngày trước ngày khởi hành: Chi phí hủy tour: 90% trên giá vé du lịch. \n - Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành : Chi phí hủy tour: 100% trên giá vé du lịch.",
    "Nếu chương trình du lịch bị hủy bỏ hoặc thay đổi bởi một trong hai bên vì lý do bất khả kháng (hỏa hoạn, thời tiết, tai nạn, thiên tai, chiến tranh, dịch bệnh, hoãn, dời, và hủy chuyến hoặc thay đổi khác của các phương tiện vận chuyển công cộng hoặc các sự việc bất khả kháng khác theo quy định pháp luật…), thì hai bên sẽ không chịu bất kỳ nghĩa vụ bồi hoàn các tổn thất đã xảy ra và không chịu bất kỳ trách nhiệm pháp lý nào. Tuy nhiên mỗi bên có trách nhiệm cố gắng tối đa để giúp đỡ bên bị thiệt hại nhằm giảm thiểu các tổn thất gây ra vì lý do bất khả kháng."
];

const SingleTour = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [suggestTours, setsuggestTours] = useState([]);
    const [tour, setTour] = useState([]);

    const [notification, setNotification] = useState(null);
    const user = JSON.parse(sessionStorage.getItem("user"));
    let isLogin = false;

    if (user && typeof user === "object") {
        // Nếu đối tượng user tồn tại và là một đối tượng
        isLogin = true;
    }
    console.log(isLogin);

    function handleBookTour() {
        if (isLogin) {
            navigate(`/đặt-tour/${tour.id}`);
        } else {
            setNotification('Vui lòng đăng nhập để đặt tour');
        }
    }

    useEffect(() => {
        axiosInstance.get(`http://localhost:5000/tours/${id}`)
            .then(response => {
                setTour(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleItemClick = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const attentionInfor = titles.map((title, index) => (
        <div className='dropdown-attentionInfor-tour'>
            <div key={index} className={`content ${expandedIndex === index ? 'expanded' : ''}`} onClick={() => handleItemClick(index)}>
                <Space>
                    <div className='title'> {title} </div>
                    <div className='downout'> <DownOutlined /> </div>
                </Space>
                {expandedIndex === index && (
                    <div className="detail" style={{ textAlign: 'justify', marginTop: '5px' }}>
                        {details[index].split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < details[index].split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </div>
    ));

    dayjs.locale('vi');
    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const formattedDate = date.format('dddd, DD/MM/YYYY');

        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    useEffect(() => {
        axiosInstance.get('http://localhost:5000/tours/get-all-tours')
            .then(response => {
                const currentTourDestinations = new Set(tour.destinations.map(destination => destination.id));

                const similarTours = response.data.filter(similarTour => (
                    similarTour.tourType.id === tour.tourType.id &&
                    similarTour.departureLocation === tour.departureLocation &&
                    similarTour.id !== tour.id
                ));

                // Lọc ra những tour có giá chênh lệch tối đa 50%
                const maxPriceDifference = tour.price * 0.5;
                const priceFilteredTours = similarTours.filter(otherTour => (
                    Math.abs(otherTour.price - tour.price) <= maxPriceDifference
                ));

                // Sắp xếp các Tour theo số lượng destinations giống nhau giảm dần và chênh lệch về giá
                priceFilteredTours.sort((a, b) => {
                    const aSimilarCount = a.destinations.filter(dest => currentTourDestinations.has(dest.id)).length;
                    const bSimilarCount = b.destinations.filter(dest => currentTourDestinations.has(dest.id)).length;

                    // Ưu tiên số lượng destinations giống nhau trước
                    if (aSimilarCount !== bSimilarCount) {
                        return bSimilarCount - aSimilarCount;
                    }

                    // Nếu số lượng destinations giống nhau, ưu tiên chênh lệch về giá
                    const aPriceDiff = Math.abs(a.price - tour.price);
                    const bPriceDiff = Math.abs(b.price - tour.price);
                    return aPriceDiff - bPriceDiff;
                });

                // Chọn ra 4 Tour có số lượng destinations giống nhau và chênh lệch về giá nhiều nhất
                const suggestedTours = priceFilteredTours.slice(0, 4);
                setsuggestTours(suggestedTours);
            })
            .catch(error => {
                console.error('Error fetching suggested tours:', error);
            });
    }, [tour]);


    return (
        <>
            <div className="singleTour">
                {notification && (
                    <div className="notification-note">
                        {notification}
                    </div>
                )}
                <div className="main-product-wrapper home-wrapper-2 py-5">
                    <div className="container-xxl">
                        <div className="row">
                            <div className="col-6">
                                <div className="product-images">
                                    <div>
                                        <img src={tour.imageLinks && tour.imageLinks[selectedImage]} alt="" className="main-img" />
                                    </div>
                                    <div className="thumbnail-gallery">
                                        {tour.imageLinks && tour.imageLinks.slice(0, 5).map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Thumbnail ${index}`}
                                                className={index === selectedImage ? 'selected' : ''}
                                                onClick={() => handleImageClick(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="main-product-details">
                                    <div className="productName-border-bottom">
                                        <h2 className="name"> {tour.name} </h2>
                                    </div>
                                    <div className="d-flex price-border-bottom py-3" style={{ position: 'relative', marginBottom: '20px' }}>
                                        <p className="price">
                                            {tour.price ?
                                                (tour.discountedPrice ? tour.discountedPrice.toLocaleString() + ' VNĐ' : tour.price.toLocaleString() + ' VNĐ')
                                                : 'Price not available'}
                                            <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}> / khách </span>
                                        </p>
                                        <button onClick={handleBookTour} className='btn-bookTour'> Đặt ngay </button>
                                    </div>
                                    <div className="border-bottom py-2">
                                        <div className="d-flex align-items-center gap-10 my-2 mt-3">
                                            <div className='row' style={{ width: '100%' }}>
                                                <div className='col-6'>
                                                    <h3 className="product-heading">
                                                        <IoTime style={{ fontSize: '20px', marginBottom: '3px', marginRight: '3px' }} /> Thời gian
                                                    </h3>
                                                    <p className="product-data"> {tour.schedule} </p>
                                                    <h3 className="product-heading">
                                                        <FaHotel style={{ fontSize: '20px', marginBottom: '3px', marginRight: '3px' }} /> Khách sạn
                                                    </h3>
                                                    <p className="product-data"> {tour.hotel} </p>
                                                </div>
                                                <div className='col-6'>
                                                    <h3 className="product-heading">
                                                        <FaPlane style={{ fontSize: '20px', marginBottom: '3px', marginRight: '3px' }} /> Phương tiện di chuyển
                                                    </h3>
                                                    <p className="product-data"> {tour.transport} </p>
                                                    <h3 className="product-heading">
                                                        <FaUserCheck style={{ fontSize: '20px', marginBottom: '3px', marginRight: '3px' }} /> Đối tượng thích hợp
                                                    </h3>
                                                    <p className="product-data"> {tour.suitableUser} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description-wrapper home-wrapper-2">
                    <div className="container-xxl">
                        <div className="row" style={{ marginTop: '-20px' }}>
                            <div className="col-4">
                                <h3 className="title"> Thông tin tập trung </h3>
                                <div className='row' style={{ width: '100%' }}>
                                    <div className='col-7'>
                                        <h3 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                            Ngày giờ
                                        </h3>
                                        <h3 className="product-heading-prices" >
                                            {formatDateTime(tour.departureDay)}
                                        </h3>
                                    </div>
                                    <div className='col-5'>
                                        <h3 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                            Nơi tập trung
                                        </h3>
                                        <h3 className="product-heading-prices" >
                                            Sân bay
                                        </h3>
                                    </div>
                                </div>
                                <h3 className="title"> Giá tour đối với từng loại khách </h3>
                                <div className='row' style={{ width: '100%' }}>
                                    <div className='col-7'>
                                        <h3 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                            Loại khách
                                        </h3>
                                        <h3 className="product-heading-prices">
                                            Người lớn (12 tuổi trở lên)
                                        </h3>
                                        <h3 className="product-heading-prices">
                                            Trẻ em (5 đến 11 tuổi)
                                        </h3>
                                        <h3 className="product-heading-prices" >
                                            Trẻ nhỏ (2 đến 4 tuổi)
                                        </h3>
                                        <h3 className="product-heading-prices">
                                            Em bé (Dưới 2 tuổi)
                                        </h3>
                                    </div>
                                    <div className='col-5'>
                                        <h3 className="product-heading-prices" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                            Giá tour
                                        </h3>
                                        <h3 className="product-heading-prices">
                                            {tour.price ?
                                                (tour.discountedPrice ? tour.discountedPrice.toLocaleString() + ' VNĐ' : tour.price.toLocaleString() + ' VNĐ')
                                                : 'Price not available'}
                                        </h3>
                                        <h3 className="product-heading-prices">
                                            {tour.price ?
                                                (tour.discountedPrice ? (tour.discountedPrice * 0.7).toLocaleString() + ' VNĐ' : (tour.price * 0.7).toLocaleString() + ' VNĐ')
                                                : 'Price not available'}
                                        </h3>
                                        <h3 className="product-heading-prices">
                                            {tour.price ?
                                                (tour.discountedPrice ? (tour.discountedPrice * 0.4).toLocaleString() + ' VNĐ' : (tour.price * 0.4).toLocaleString() + ' VNĐ')
                                                : 'Price not available'}
                                        </h3>
                                        <h3 className="product-heading-prices">
                                            {tour.price ?
                                                (tour.discountedPrice ? (tour.discountedPrice * 0.1).toLocaleString() + ' VNĐ' : (tour.price * 0.1).toLocaleString() + ' VNĐ')
                                                : 'Price not available'}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                <h3 className="title"> Lịch trình chi tiết </h3>
                                <div className="bg-white p-3">
                                    <p className="tour-details"> {ReactHtmlParser(tour.detailedSchedule)} </p>
                                </div>
                            </div>
                            <div className="row suggestTour">
                                <h3> Những thông tin cần lưu ý </h3>
                                <div className='dropdown-attentionInfor-tour'>
                                    <div className="row">
                                        <div className="col-6">
                                            {attentionInfor.slice(0, 1)}
                                            {attentionInfor.slice(1, 2)}
                                            {attentionInfor.slice(2, 3)}
                                            {attentionInfor.slice(3, 4)}
                                        </div>
                                        <div className="col-6">
                                            {attentionInfor.slice(4, 5)}
                                            {attentionInfor.slice(5, 6)}
                                            {attentionInfor.slice(6, 7)}
                                            {attentionInfor.slice(7, 8)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row suggestTour">
                                <h3> Có thể quý khách sẽ thích </h3>
                                <div className="row tour">
                                    {suggestTours.slice(0, 4).map(tour => (
                                        <div key={tour.id} className="col-3">
                                            <TourCard tour={tour} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SingleTour