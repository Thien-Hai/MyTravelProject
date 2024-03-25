import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import QuillEditor from '../components/QuillEditor';

const EditTourTypeAdmin = () => {
    const [tourType, setTourType] = useState({});
    const [destinations, setDestinations] = useState([]);
    const [notification, setNotification] = useState(null);
    const { tourTypeName } = useParams();

    // Hàm chia các ô checkbox thành các hàng có mỗi hàng chứa maxItems phần tử
    const splitIntoRows = (arr, maxItems) => {
        const rows = [];
        for (let i = 0; i < arr.length; i += maxItems) {
            rows.push(arr.slice(i, i + maxItems));
        }
        return rows;
    };

    useEffect(() => {
        // Fetch dữ liệu thương hiệu từ API
        axios
            .get(`http://localhost:5000/destinations`)
            .then((response) => {
                setDestinations(response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu điểm đến:', error);
            });

        // Decode tên loại sản phẩm trước khi gửi yêu cầu API
        const decodedTourTypeName = decodeURIComponent(tourTypeName);

        // Fetch dữ liệu loại sản phẩm dựa vào tên loại sản phẩm
        axios
            .get(`http://localhost:5000/tour-types/get-all-tour-types`)
            .then((response) => {
                const foundTourType = response.data.find((tourType) => tourType.name === decodedTourTypeName);
                if (foundTourType) {
                    setTourType(foundTourType); // Lưu dữ liệu loại sản phẩm vào state
                } else {
                    console.error(`Không tìm thấy loại tour có tên ${decodedTourTypeName}`);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu loại tour:', error);
            });
    }, [tourTypeName]);

    // Hàm xử lý khi ấn nút "Cập nhật loại sản phẩm"
    const handleUpdateTourType = (e) => {
        e.preventDefault();

        // Lấy ra các trường dữ liệu cần cập nhật từ state productType
        const { name, desc, destinations } = tourType;

        const updatedTourType = {
            name,
            desc,
            destinations,
        };

        axios
            .patch(`http://localhost:5000/tour-types/${tourType.id}`, updatedTourType)
            .then(() => {
                setNotification('Cập nhật loại tour thành công');
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật dữ liệu loại tour:', error);
                setNotification('Cập nhật loại tour không thành công');
            });
    };

    return (
        <div>
            <h3 className="mb-4">Cập nhật loại tour</h3>
            {notification && (
                <div className={`notification ${notification === 'Cập nhật loại tour thành công' ? 'success' : 'error'}`}>
                    {notification}
                </div>
            )}
            <div className="">
                <form onSubmit={handleUpdateTourType}>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title">Cập nhật tên</h5>
                        </div>
                        <input
                            type="text"
                            className="brandname-input"
                            value={tourType.name}
                            onChange={(e) => setTourType({ ...tourType, name: e.target.value })}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title">Cập nhật mô tả</h5>
                        </div>
                        {/* <TextArea
                            rows={5}
                            className="brandDesc-input"
                            value={tourType.desc}
                            onChange={(e) => setProductType({ ...productType, desc: e.target.value })}
                        /> */}
                        <QuillEditor />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title">Cập nhật điểm đến</h5>
                        </div>
                        {splitIntoRows(destinations, 4).map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((destination) => (
                                    <div key={destination.id} className="col">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={destination.id}
                                                id={`checkbox-${destination.id}`}
                                                checked={tourType.destinations && tourType.destinations.some((b) => b.name === destination.name)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setTourType((prevState) => ({
                                                            ...prevState,
                                                            destinations: [...prevState.destinations, destination],
                                                        }));
                                                    } else {
                                                        setTourType((prevState) => ({
                                                            ...prevState,
                                                            destinations: prevState.destinations.filter((b) => b.name !== destination.name),
                                                        }));
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor={`checkbox-${destination.id}`}>
                                                <h4 className="label">{destination.name}</h4>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Cập nhật loại tour
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditTourTypeAdmin;
