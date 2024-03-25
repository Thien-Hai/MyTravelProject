import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'react-quill/dist/quill.snow.css';
import QuillEditor from '../components/QuillEditor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTourType = () => {
    const [typeName, setTypeName] = useState("");
    const [typeDesc, setTypeDesc] = useState("");
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [destinationId, setDestinationId] = useState(0);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await axios.get("http://localhost:5000/destinations");
            setDestinations(response.data);
        } catch (error) {
            console.error("Error: ", error.response);
        }
    };

    // Hàm chia các ô checkbox thành các hàng có mỗi hàng chứa maxItems phần tử
    const splitIntoRows = (arr, maxItems) => {
        const rows = [];
        for (let i = 0; i < arr.length; i += maxItems) {
            rows.push(arr.slice(i, i + maxItems));
        }
        return rows;
    };

    const handleTypeNameChange = (e) => {
        setTypeName(e.target.value);
    };

    const handleTypeDescChange = (content) => {
        setTypeDesc(content);
    };

    const handleDestinationChange = (e) => {
        const destinationId = parseInt(e.target.value);
        if (e.target.checked) {
            // Nếu ô checkbox được check, thêm destinationId vào danh sách các thương hiệu được chọn
            setSelectedDestinations((prevSelectedDestinations) => [...prevSelectedDestinations, destinationId]);
        } else {
            // Nếu ô checkbox bị uncheck, loại bỏ destinationId khỏi danh sách các thương hiệu được chọn
            setSelectedDestinations((prevSelectedDestinations) =>
                prevSelectedDestinations.filter((id) => id !== destinationId)
            );
        }
    };

    // Thêm useEffect để theo dõi thay đổi của selectedDestinations
    useEffect(() => {
        console.log(selectedDestinations);
    }, [selectedDestinations]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTourType = {
            name: typeName,
            desc: typeDesc,
            destinationId: destinationId,
        };

        try {
            // Lấy danh sách tất cả các tour type từ database
            // const response = await axios.get("http://localhost:5000/tour-types/get-all-tour-types");
            // const allTourTypes = response.data;

            // // Kiểm tra xem typeName đã tồn tại trong danh sách các tour type hay chưa
            // const tourTypeExists = allTourTypes.some((tourType) => tourType.name === typeName);

            // if (tourTypeExists) {
            // Nếu typeName đã tồn tại, hiển thị thông báo 
            // setNotification('Thêm mới thất bại do tên tour type đã tồn tại');
            // throw "eee";
            // } else {
            // Nếu typeName chưa tồn tại, thực hiện yêu cầu POST để thêm tour type mới vào database
            await axios.post("http://localhost:5000/tour-types/create-new-tour-type", newTourType);
            // notification.success({
            //     message: 'Notification Title',
            //     description: error.response?.data?.message ?? "Thêm mới thành công",
            //     duration: 5,
            // });
            // Hiển thị thông báo "Thêm mới thành công"
            // setNotification('Thêm mới thành công');
            toast.success("áhdkjsahkajsd", { delay: 100, autoClose: 3000, position: 'top-right' })
            // }
        } catch (error) {
            // console.error("Error: ", error.response.data.message);
            // setNotification(error.response.data.message ?? 'Thêm mới thất bại');
            // notification.error({
            //     message: 'Notification Title',
            //     description: error.response?.data?.message ?? "Thêm mới thất bại",
            //     duration: 5,
            // });

            toast.error("áhdkjsahkajsd", { delay: 3000, autoClose: true, position: 'top-right', })
        }
    };

    return (
        <div>
            <h4 className="mb-4">Thêm mới loại tour</h4>
            {/* {notification && (
                <div className={`notification ${notification === 'Thêm mới thành công' ? 'success' : 'error'}`}>
                    {notification}
                </div>
            )} */}

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Tên </h5>
                        </div>
                        <input type="text"
                            className="brandname-input"
                            value={typeName}
                            onChange={handleTypeNameChange}
                        />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Mô tả </h5>
                        </div>
                        {/* <input type="text"
                            className="brandname-input"
                            value={typeDesc}
                            onChange={handleTypeDescChange}
                        /> */}
                        <QuillEditor value={typeDesc} onEditorChange={handleTypeDescChange} />
                    </div>
                    <div className="category-wrapper">
                        <div className="category-header">
                            <h5 className="sub-title"> Chọn điểm đến </h5>
                        </div>
                        {splitIntoRows(destinations, 5).map((row, rowIndex) => (
                            <div key={rowIndex} className="row">
                                {row.map((destination) => (
                                    <div key={destination.id} className="col">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={destination.id}
                                                id={`checkbox-${destination.id}`}
                                                checked={selectedDestinations.includes(destination.id)}
                                                onChange={handleDestinationChange}
                                            />
                                            <label className="form-check-label" htmlFor={`checkbox-${destination.id}`}>
                                                <h4 className="label" style={{ fontSize: '14px' }}>{destination.name}</h4>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                        Thêm mới
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTourType;
