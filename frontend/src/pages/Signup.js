import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const url = "http://localhost:5000/auth/";
    let navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
    });
    const { username, email, password, phoneNumber } = user;
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}register`, user);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                alert(errorMessage); // Hiển thị thông báo lỗi trong một alert
            } else {
                alert("An error occurred. Please try again later."); 
            }
        }
    };
    return (
        <>
            <div className="signup-wrapper">
                <div className="background-image">
                    <img src="images/background.jpg"></img>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3"> Đăng ký </h3>
                            <form action=""
                                className="d-flex flex-column gap-15"
                                onSubmit={(e) => onSubmit(e)}>
                                <div>
                                    <input type="text"
                                        name="username"
                                        placeholder="Tên người dùng"
                                        className="form-control"
                                        onChange={(e) => onInputChange(e)}
                                        value={username}
                                    />
                                </div>
                                <div>
                                    <input type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        onChange={(e) => onInputChange(e)}
                                        value={email}
                                    />
                                </div>
                                <div>
                                    <input type="password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        className="form-control"
                                        onChange={(e) => onInputChange(e)}
                                        value={password}
                                    />
                                </div>
                                <div>
                                    <input type="tel"
                                        name="phoneNumber"
                                        placeholder="Số điện thoại"
                                        className="form-control"
                                        onChange={(e) => onInputChange(e)}
                                        value={phoneNumber}
                                    />
                                </div>
                                <div>
                                    <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="btn border-0"
                                            type="submit" style={{ fontWeight: '500', fontSize: '15px', width: '100%' }}> Đăng ký </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup