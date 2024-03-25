import React from 'react'
import { BsInstagram, BsYoutube } from 'react-icons/bs';
import { SiZalo } from 'react-icons/si';
import { ImFacebook } from 'react-icons/im';
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="footer">
            <div className="secContainer container grid">
                <div className="footerLogo">
                    <div>
                        <span> H-Travel </span>
                    </div>
                    <div className="socials flex">
                        <ImFacebook className='icon' />
                        <BsInstagram className='icon' />
                        <SiZalo className='icon' />
                        <BsYoutube className='icon' />
                    </div>
                </div>
                <div className="footerLinks">
                    <span className="linkTitle">
                        Điều khoản và chính sách
                    </span>
                    <li className='text1'>
                        <a href='#' className='text2'>Chính sách đặt tour</a>
                    </li>
                    <li className='text1'>
                        <a href='#' className='text2'>Chính sách bảo mật</a>
                    </li>
                    <li className='text1'>
                        <a href='#' className='text2'>Các điều khoản và điều kiện</a>
                    </li>
                    <li className='text1'>
                        <a href='#' className='text2'>Phiếu góp ý</a>
                    </li>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Đường dẫn nhanh
                    </span>
                    <li className='text1'>
                        <a href='#' className='text2' >Du lịch trong nước</a>
                    </li>
                    <li className='text1'>
                        <a href='#' className='text2' >Du lịch nước ngoài</a>
                    </li>
                    <li className='text1'>
                        <a href='#' className='text2'>Điểm đến</a>
                    </li>
                    <li className='text1'>
                        <a href='#' className='text2'>Tin tức</a>
                    </li>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Thông tin liên hệ
                    </span>
                    <span className="address">
                        Trụ sở chính: 277 Trần Phú, quận Hà Đông, Hà Nội
                    </span>
                    <span className="phone">
                        +91 439439663
                    </span>
                    <span className="email">
                        trnthienhai@gmail.com
                    </span>
                    <div className='d-flex align-items-center justify-content-center'>
                        <button className='btn' style={{ width: '130px', marginTop: '10px' }}>
                            <div style={{ fontSize: '16px' }}>  <FaPhone /> 1900 1839 </div>
                        </button>
                        <div
                            style={{ margin: '10px 0 0 10px', fontWeight: '500', fontSize: '15px', color: 'hsl(242, 94%, 14%)' }}> Tổng đài tư vấn
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Footer