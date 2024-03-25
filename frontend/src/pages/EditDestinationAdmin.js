import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useParams } from "react-router-dom";
import { Input } from 'antd';
import QuillEditor from '../components/QuillEditor';

const EditDestinationAdmin = () => {
    const [destinationDesc, setDestinationDesc] = useState('');
    const [notification, setNotification] = useState(null);
    const { destinationId } = useParams();
    console.log(destinationId)
    const [destination, setDestination] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/destinations/${destinationId}`)
            .then(response => {
                setDestination(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [destinationId]);

    const handleEditorChange = (content) => {
        setDestination({ ...destination, desc: content });
    };

    const handleUpdateDestination = (e) => {
        e.preventDefault();
        const { name, desc } = destination;
        const updatedDestination = {
            name,
            desc,
        };

        axios
            .patch(`http://localhost:5000/destinations/${destinationId}`, updatedDestination)
            .then((response) => {
                setDestination(response.data);
                setNotification('Cập nhật thành công');
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật dữ liệu điểm đến:', error);
                setNotification('Cập nhật không thành công');
            });
    }

    const renderImagesAndText = (text) => {
        const regex = /(https?:\/\/[^\s]+)/g;
        const matches = text.match(regex);

        if (matches && matches.length > 0) {
            const parts = text.split(regex);
            const elements = [];
            parts.forEach((part, index) => {
                // Bỏ qua nếu là đường link ảnh
                if (index % 2 === 0) {
                    elements.push(<div key={`text-${index}`} className="text-content">{part}</div>);
                } else {
                    elements.push(<img key={`image-${index}`} src={part} alt={`image-${index}`} style={{ maxWidth: '70%', height: 'auto' }} />);
                }
            });

            return <div className="image-container">{elements}</div>;
        }

        return <div className="text-content">{text}</div>;
    };

    return (
        <div>
            <h3 className="mb-4">Cập nhật điểm đến</h3>
            {notification && (
                <div className={`notification ${notification === 'Cập nhật thành công' ? 'success' : 'error'}`}>
                    {notification}
                </div>
            )}
            <div className="">
                <form onSubmit={handleUpdateDestination}>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title">Cập nhật tên</h5>
                        </div>
                        <input
                            type="text"
                            className="brandname-input"
                            value={destination.name}
                            onChange={(e) => setDestination({ ...destination, name: e.target.value })}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Cập nhật mô tả </h5>
                        </div>
                        <QuillEditor value={destination.desc} onEditorChange={handleEditorChange} />
                    </div>
                    <div className="bg-white p-3">
                        {/* Giữ nguyên văn bản và hiển thị ảnh từ đường link */}
                        {renderImagesAndText(destinationDesc)}
                    </div>
                    <button className="btn btn-success border-0 rounded-3 my-2" type="submit"> Cập nhật </button>
                </form>
            </div>
        </div>
    );
}

export default EditDestinationAdmin;
