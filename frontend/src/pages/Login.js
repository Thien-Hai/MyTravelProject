import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const { email, password } = user;
    const onInputChange = (change) => {
        setUser({ ...user, [change.target.name]: change.target.value })
    }

    const onSubmit = async (change) => {
        change.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", user);
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            if ((response.data.user.isAdmin) === true) {
                navigate("/admin");
            }
            else {
                navigate("/")

            }
        } catch (error) {
            console.log('error: ', error);
            setNotification('Email và mật khẩu không đúng');
        }
    }
    return (
        <>
            <div className="login-wrapper">
                {notification && (
                    <div className="notification-error">
                        {notification}
                    </div>
                )}
                <div className="background-image">
                    <img src="images/background.jpg" loading="lazy"></img>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3"> Đăng nhập </h3>
                            <form action=""
                                className="d-flex flex-column gap-15"
                                onSubmit={(change) => onSubmit(change)}>
                                <div className="toggle-icon">
                                    <input type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={email}
                                        onChange={(change) => onInputChange(change)}
                                    />
                                </div>
                                <div className="d-flex align-items-center mt-1">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Mật khẩu"
                                        className="form-control"
                                        value={password}
                                        onChange={(change) => onInputChange(change)}
                                    />
                                    <span
                                        className="password-toggle-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <BsEye /> : <BsEyeSlash />}
                                    </span>
                                </div>
                                <div>
                                    <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="btn border-0" type="submit" style={{ width: '100%' }}>
                                            <div className="button-login">
                                                Đăng nhập
                                            </div>
                                        </button>
                                    </div>
                                    <Link to="/forgot-password" >
                                        <div className="button-forgot-password" >
                                            Quên mật khẩu?
                                        </div>
                                    </Link>
                                    <p style={{ textAlign: 'center', marginTop: '5px', fontSize: '15px', fontWeight: '500', color: 'hsl(242, 94%, 14%)' }}>
                                        Chưa có tài khoản? &nbsp;
                                        <Link to="/signup" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                                            Đăng ký ngay
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Login;

