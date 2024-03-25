import React, { useState } from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';
import QuillEditor from '../components/QuillEditor';

const AddTravelTipAdmin = () => {
    const [destinationName, setDestinationName] = useState("");
    const [destinationLocation, setDestinationLocation] = useState("");
    const [destinationImage, setDestinationImage] = useState("");
    const [destinationDesc, setDestinationDesc] = useState("");
    const [notification, setNotification] = useState(null); // Thêm state cho thông báo
    const { TextArea } = Input;

    const handleDestinationNameChange = (e) => {
        setDestinationName(e.target.value);
    };

    const handleDestinationLocationChange = (e) => {
        setDestinationLocation(e.target.value);
    };

    const handleDestinationImageChange = (e) => {
        setDestinationImage(e.target.value);
    };

    const handleDestinationDescChange = (e) => {
        setDestinationDesc(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDestination = {
            name: destinationName,
            // desc: destinationDesc,
            mainImageLink: destinationImage,
            location: destinationLocation,
        };

        // Lấy danh sách tất cả các destination từ database
        try {
            // Nếu destinationName chưa tồn tại, thực hiện yêu cầu POST để thêm destination mới vào database
            await axios.post("http://localhost:5000/destinations", newDestination);
            // Hiển thị thông báo "Thêm mới thành công"
            setNotification('Thêm mới thành công');

        } catch (error) {
            console.error("Error: ", error.response);
        }
    };

    return (
        <div>
            <h4 className="mb-4">Thêm mới tin tức</h4>
            {notification && (
                <div className={`notification-success ${notification === 'Thêm mới thành công' ? 'success' : 'error'}`}>
                    {notification}
                </div>
            )}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Tiêu đề </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={destinationName}
                            onChange={handleDestinationNameChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Thể loại </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={destinationLocation}
                            onChange={handleDestinationLocationChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Nội dung </h5>
                        </div>
                        <QuillEditor onEditorChange={handleDestinationDescChange} />
                    </div>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Thêm mới
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTravelTipAdmin;
