import React from 'react'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi';

const Contact = () => {
    return (
        <>
            <div className="contact-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12" style={{ marginTop: '80px' }}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.301678966152!2d105.78532367538583!3d20.98054088065671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acce762c2bb9%3A0xbb64e14683ccd786!2zSOG7jWMgVmnhu4duIENOIELGsHUgQ2jDrW5oIFZp4buFbiBUaMO0bmcgLSBIw6AgxJDDtG5n!5e0!3m2!1svi!2s!4v1703438454558!5m2!1svi!2s"
                                width="600" height="450" className="border-0 w-100"
                                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                        <div className="mt-2">
                            <div className="contact-inner-wrapper d-flex justify-content-between">
                                <div className='row'>
                                    <h3 className="contact-title mb-4 d-flex justify-content-center"> Mạng lưới chi nhánh </h3>
                                    <div className='col-3'>
                                        <ul className="ps-0">
                                            <h4 className='mb-3' style={{ fontWeight: 'bold' }}> Chi nhánh Hà Nội </h4>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineHome className="fs-5" /> &ensp;
                                                <address className="mb-0">
                                                    277 Trần Phú, quận Hà Đông, Hà Nội
                                                </address>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiPhoneCall className="fs-5" /> &ensp;
                                                <a href="tel:+91 4392543259">+91 439439663</a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineMail className="fs-5" /> &ensp;
                                                <a href="mailto:trnthienhai@gmail.com">
                                                    trnthienhai@gmail.com
                                                </a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiInfoCircle className="fs-5" /> &ensp;
                                                <p className="mb-0">  9AM - 9PM </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-3'>
                                        <ul className="ps-0">
                                            <h4 className='mb-3' style={{ fontWeight: 'bold' }}> Chi nhánh Đà Nẵng </h4>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineHome className="fs-5" /> &ensp;
                                                <address className="mb-0">
                                                    56A Bạch Đằng, Hải Châu, Đà Nẵng
                                                </address>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiPhoneCall className="fs-5" /> &ensp;
                                                <a href="tel:+91 4392543259">+91 577229787</a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineMail className="fs-5" /> &ensp;
                                                <a href="mailto:trnthienhai@gmail.com">
                                                    nguyenhung@gmail.com
                                                </a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiInfoCircle className="fs-5" /> &ensp;
                                                <p className="mb-0"> Thứ Hai - Thứ Sáu 9AM - 9PM </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-3'>
                                        <ul className="ps-0">
                                            <h4 className='mb-3' style={{ fontWeight: 'bold' }}> Chi nhánh Nha Trang </h4>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineHome className="fs-5" /> &ensp;
                                                <address className="mb-0">
                                                    100 Quang Trung, Lộc Thọ, thành phố Nha Trang
                                                </address>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiPhoneCall className="fs-5" /> &ensp;
                                                <a href="tel:+91 4392543259">+91 887525266</a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineMail className="fs-5" /> &ensp;
                                                <a href="mailto:trnthienhai@gmail.com">
                                                    phamtien@gmail.com
                                                </a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiInfoCircle className="fs-5" /> &ensp;
                                                <p className="mb-0"> Thứ Hai - Thứ Sáu 9AM - 9PM </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-3'>
                                        <ul className="ps-0">
                                            <h4 className='mb-3' style={{ fontWeight: 'bold' }}> Chi nhánh TP.HCM </h4>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineHome className="fs-5" /> &ensp;
                                                <address className="mb-0">
                                                    135 Giải Phóng, quận Tân Bình, TP.Hồ Chí Minh
                                                </address>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiPhoneCall className="fs-5" /> &ensp;
                                                <a href="tel:+91 4392543259">+91 227858543</a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <AiOutlineMail className="fs-5" /> &ensp;
                                                <a href="mailto:trnthienhai@gmail.com">
                                                    dinhvanlong@gmail.com
                                                </a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <BiInfoCircle className="fs-5" /> &ensp;
                                                <p className="mb-0"> Thứ Hai - Thứ Sáu 9AM - 9PM </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="contact-title mt-4 mb-4 d-flex justify-content-center"> Tài khoản ngân hàng của chúng tôi </h3>
                                    <div className="col-4 d-flex justify-content-center align-items-center" style={{ marginLeft: '272px', marginRight: '-70px' }}>
                                        <ul className="ps-0">
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <a className="mb-0" style={{ fontSize: '18px' }}>
                                                    102883939066
                                                </a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <a className="mb-0" style={{ fontSize: '18px' }}>VietinBank</a>
                                            </li>
                                            <li className="mb-2 d-flex gap-15 align-items-center">
                                                <a className="mb-0" style={{ fontSize: '18px' }}>
                                                    CONG TY DU LICH H-TRAVEL
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-3 d-flex justify-content-center" style={{ marginTop: '-20px', flexDirection: 'column' }}>
                                        <img src="images/qrcode.png" loading="lazy" style={{ width: '300px', height: '300ox' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact