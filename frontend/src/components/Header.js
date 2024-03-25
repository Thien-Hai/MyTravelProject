import React, { useState, useEffect } from 'react';
import { BiLogoMediumOld } from 'react-icons/bi';
import { AiOutlineRight } from 'react-icons/ai';
import { NavLink, Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { Dropdown, Space } from 'antd';
import axios from 'axios';

const Header = () => {
    const [showColumns, setShowColumns] = useState({
        domestic: true,
        international: false,
    });

    const handleDomesticTravelHover = () => {
        setShowColumns({
            domestic: true,
            international: false,
        });
    };

    const handleInternationalTravelHover = () => {
        setShowColumns({
            domestic: false,
            international: true,
        });
    };

    const user = JSON.parse(sessionStorage.getItem("user"));
    let isLogin = false;
    let username = "";
    let email = "";

    if (user && typeof user === "object") {
        // Nếu đối tượng user tồn tại và là một đối tượng
        isLogin = true;
        username = user.username || "";
        email = user.email || "";
    }

    const handleLogout = () => {
        // Xóa dữ liệu người dùng trong sessionStorage và đánh dấu là chưa đăng nhập
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("accessToken");
        isLogin = false;
    };

    const items = [
        {
            label: (
                <Link
                    to={`/thông-tin-cá-nhân`}
                    className='dropdown-user'>
                    Hồ sơ
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link
                    to="/login"
                    className='dropdown-user'
                    onClick={handleLogout}>
                    Đăng xuất
                </Link>
            ),
            key: '1',
        },
    ];

    const [tourTypes, setTourTypes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tour-types/get-all-tour-types')
            .then(response => {
                setTourTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching tour types:', error);
            });
    }, []);

    return (
        <div className="menu">
            <div className="logoDiv" style={{ fontSize: '20px', fontWeight: '600', color: 'hsl(242, 94%, 14%)' }}>
                <span> H-Travel </span>
            </div>
            <div className="navBar">
                <NavLink className="navList" to="/">
                    Trang chủ
                </NavLink>
                <li className="navList">
                    Du lịch
                    <div className="mega-box">
                        <div className="content">
                            <div className="content-left">
                                <header className="domesticTravel" onMouseEnter={handleDomesticTravelHover}> Du lịch trong nước <AiOutlineRight /></header>
                                <br />
                                <header className="internationalTravel" onMouseEnter={handleInternationalTravelHover}> Du lịch nước ngoài <AiOutlineRight /></header>
                            </div>
                            <div className="content-right">
                                {showColumns.domestic && (
                                    <>
                                        {tourTypes
                                            .sort((a, b) => a.id - b.id)
                                            .slice(0, 3)
                                            .concat([tourTypes.find(tourType => tourType.id === 9)])
                                            .map(tourType => (
                                                <div className="row" key={tourType?.id}>
                                                    <ul className="mega-link">
                                                        <header>
                                                            <Link to={`${tourType?.name.replace(/\s/g, '-')}`} className="tourTypeName">{tourType?.name}</Link>
                                                        </header>
                                                        {tourType?.destinations
                                                            .sort((a, b) => a.id - b.id)
                                                            .slice(0, 5)
                                                            .map(destination => (
                                                                <li key={destination.id}>
                                                                    <Link to={`/Du-lịch/${destination.name.replace(/\s/g, '-')}`}>  Du lịch {destination.name}</Link>
                                                                </li>
                                                            ))}

                                                    </ul>
                                                    <footer>
                                                        <Link to={`${tourType?.name.replace(/\s/g, '-')}`} className="tourType">Xem tất cả</Link>
                                                    </footer>
                                                </div>
                                            ))}
                                    </>

                                )}
                                {showColumns.international && (
                                    <>
                                        {tourTypes
                                            .sort((a, b) => a.id - b.id)
                                            .slice(3, 8)
                                            .map(tourType => (
                                                <div className="row">
                                                    <ul className="mega-link">
                                                        <header key={tourType?.id}>
                                                            <Link to={`${tourType?.name.replace(/\s/g, '-')}`} className="tourTypeName">{tourType?.name}</Link>
                                                        </header>
                                                        {tourType?.destinations
                                                            .sort((a, b) => a.id - b.id)
                                                            .slice(0, 5)
                                                            .map(destination => (
                                                                <li key={destination.id}>
                                                                    <Link to={`tour-type/${tourType.name}/${destination.name}`}>  Du lịch {destination.name}</Link>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                    <footer>
                                                        <Link to={`${tourType?.name.replace(/\s/g, '-')}`} className="tourType">Xem tất cả</Link>
                                                    </footer>
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </li>
                <NavLink className="navList" to="/Điểm-đến">
                    Điểm đến
                </NavLink>
                <NavLink className="navList" to="/Tin-tức">
                    Tin tức
                </NavLink>
                <NavLink className="navList" to="/Liên-hệ">
                    Liên hệ
                </NavLink>
            </div>
            {isLogin ? (
                <div className='dropdown-header-user'>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <a style={{ color: 'hsl(242, 94%, 14%)' }}
                            onClick={(e) => e.preventDefault()}>
                            <Space>
                                {user.username}
                                <div style={{ marginBottom: '7px' }}>
                                    <FaUser />
                                </div>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            ) : (
                <Link to="/login">
                    <button className="signUpBtn btn"> Đăng nhập </button>
                </Link>
            )}
        </div>
    );
};

export default Header;
