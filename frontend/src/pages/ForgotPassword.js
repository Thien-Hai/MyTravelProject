import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/auth/forgot', { email });

            navigate('/reset-password');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <div className="forgot-password-wrapper">
                <div className="background-image">
                    <img src="images/background.jpg"></img>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-2"> Quên mật khẩu </h3>
                            <p className="text-center mt-2 mb-2"> Chúng tôi sẽ gửi cho bạn một tin nhắn email để khôi phục mật khẩu </p>
                            <form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-column gap-15">
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Nhập email của bạn"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="mt-2 d-flex justify-content-center flex-column gap-15 align-items-center">
                                        <button className="btn border-0" type="submit" style={{ fontSize: '15px', fontWeight: '500', width: '100%' }}>
                                            Đồng ý
                                        </button>
                                        <Link to="/login"> <div style={{ fontWeight: '500', fontSize: '15px', marginTop: '10px' }}> Hủy </div></Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
