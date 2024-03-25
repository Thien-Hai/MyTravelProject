import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsEyeSlash, BsEye } from 'react-icons/bs'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
            console.log('error: ', error)
            alert("Your email/password do not match. Please try again!");
        }
    }
    return (
        <>
            <div className="login-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div class="trademark">
                            <img src="images/logo.png" style={{ width: '160px', height: '90px', marginBottom: '-10px' }} />
                            <p> HQ-TECH STORE</p>
                        </div>
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
                                <div className="mt-1">
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
                                    <Link to="/forgot-password" style={{ fontSize: '15px', color: 'rgb(10, 137, 235)' }} > Quên mật khẩu? </Link>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" type="submit" style={{ width: '100%' }}> Đăng nhập </button>
                                    </div>
                                    <p style={{ textAlign: 'center', marginTop: '8px' }}>
                                        Chưa có tài khoản? &nbsp;
                                        <Link to="/signup" style={{ fontSize: '15px', color: 'rgb(10, 137, 235)' }}> Đăng ký ngay </Link>
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

