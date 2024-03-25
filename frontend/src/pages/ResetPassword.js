import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [formData, setFormData] = useState({
        token: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra mật khẩu và mật khẩu xác nhận phù hợp
        if (formData.password !== formData.passwordConfirm) {
            alert('Passwords do not match');
            return;
        }

        // Gửi thông tin OTP và mật khẩu mới đến backend
        axios.post('http://localhost:5000/auth/reset', formData)
            .then((response) => {
                // Xử lý phản hồi từ backend nếu cần thiết
                alert("Change password successfully");
                navigate('/login');
            })
            .catch((error) => {
                // Xử lý lỗi từ backend nếu có
                alert('Error resetting password: ' + error);
            });
    };

    return (
        <>
            <div className="reset-password-wrapper">
                <div className="background-image">
                    <img src="images/background.jpg"></img>
                </div>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3 className="text-center mb-3"> Khôi phục mật khẩu </h3>
                                <form onSubmit={(e) => handleSubmit(e)}
                                    className="d-flex flex-column gap-15">
                                    <p className="text-center mb-3"> Nhập mã OTP từ tin nhắn email của bạn </p>
                                    <div>
                                        <input type="text"
                                            name="token"
                                            placeholder="OTP"
                                            className="form-control"
                                            value={formData.token}
                                            onChange={(e) => handleChange(e)} />
                                    </div>
                                    <div className="d-flex align-items-center mt-1">
                                        <input type={showPassword1 ? "text" : "password"}
                                            name="password"
                                            placeholder="Mật khẩu mới"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={(e) => handleChange(e)} />
                                        <span
                                            className="password-toggle-icon"
                                            onClick={() => setShowPassword1(!showPassword1)}
                                        >
                                            {showPassword1 ? <BsEye /> : <BsEyeSlash />}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center mt-1">
                                        <input type={showPassword2 ? "text" : "password"}
                                            name="passwordConfirm"
                                            placeholder="Xác nhận mật khẩu mới"
                                            className="form-control"
                                            value={formData.passwordConfirm}
                                            onChange={(e) => handleChange(e)} />
                                        <span
                                            className="password-toggle-icon"
                                            onClick={() => setShowPassword2(!showPassword2)}
                                        >
                                            {showPassword2 ? <BsEye /> : <BsEyeSlash />}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                                            <button className="btn border-0" type="submit"
                                                style={{ fontWeight: '500', fontSize: '15px', width: '100%' }}> Xác nhận </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword