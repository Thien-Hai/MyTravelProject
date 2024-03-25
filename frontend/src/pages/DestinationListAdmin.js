import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal, Input, Spin } from 'antd';
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const { Search } = Input;

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên',
        dataIndex: 'name',
    },
    {
        title: 'Vị trí',
        dataIndex: 'location',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const DestinationList = () => {
    const [data1, setData1] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingDestination, setDeletingDestination] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    // Function xử lý sự kiện khi người dùng thay đổi nội dung trong thanh tìm kiếm
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    // Function lọc danh sách các destination dựa trên nội dung tìm kiếm
    const filteredData = data1.filter(destination => destination.name.toLowerCase().includes(searchText.toLowerCase()));

    // Kiểm tra xem có dữ liệu destination nào trong danh sách đã lọc hay không
    const isDataFound = filteredData.length > 0;


    useEffect(() => {
        // Thực hiện yêu cầu HTTP để lấy danh sách các điểm đến từ backend
        axios.get('http://localhost:5000/destinations')
            .then(response => {
                // Chuyển đổi dữ liệu thành dạng phù hợp để hiển thị trong bảng
                const formattedData = response.data.sort((a, b) => a.id - b.id).map((destination, index) => ({
                    key: index + 1,
                    name: destination.name,
                    location: destination.location,
                    action: (
                        <Space size="middle">
                            <Link to={`/admin/cap-nhat-diem-den/${destination.id}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                            <a onClick={() => showDeleteConfirmation(destination)} className="delete-button"> <AiOutlineDelete className="mb-1" /> Xóa </a>
                        </Space>
                    )
                }));
                // Lưu dữ liệu vào state
                setData1(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
                setLoading(false);
            });
    }, []);

    const showDeleteConfirmation = (destination) => {
        setDeletingDestination(destination);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        // Thực hiện yêu cầu DELETE đến backend để xóa điểm đến
        axios.delete(`http://localhost:5000/destinations/${deletingDestination.id}`)
            .then(response => {
                // Sau khi xóa thành công, lấy lại danh sách các điểm đến từ backend
                axios.get('http://localhost:5000/destinations')
                    .then(response => {
                        // Chuyển đổi dữ liệu thành dạng phù hợp để hiển thị trong bảng
                        const formattedData = response.data.map((destination, index) => ({
                            key: index + 1,
                            name: destination.name,
                            action: (
                                <Space size="middle">
                                    <Link to={`/admin/cap-nhat-diem-den/${destination.id}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                                    <a onClick={() => showDeleteConfirmation(destination)}> <AiOutlineDelete className="mb-1" /> Xóa</a>
                                </Space>
                            )
                        }));
                        // Lưu dữ liệu vào state
                        setData1(formattedData);
                        // Đóng thông báo xác nhận xóa
                        setDeleteModalVisible(false);
                    })
                    .catch(error => {
                        console.error('Error fetching destinations:', error);
                        // Đóng thông báo xác nhận xóa
                        setDeleteModalVisible(false);
                    });
            })
            .catch(error => {
                console.error('Error deleting destination:', error);
                // Đóng thông báo xác nhận xóa
                setDeleteModalVisible(false);
            });
    };

    const handleDeleteCancel = () => {
        // Đóng thông báo xác nhận xóa
        setDeleteModalVisible(false);
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <Search placeholder="Tìm điểm đến theo tên..."
                    value={searchText}
                    onChange={handleSearchChange}
                    enterButton
                    style={{
                        width: 500,
                    }} />
            </div>
            <h4 className="mt-4"> Danh sách các điểm đến </h4>
            {loading ? (
                <div style={{ marginTop: '200px', color: 'red' }} >
                    <Spin tip="Đang tải dữ liệu..." size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <>
                    <div>
                        {isDataFound ? (
                            <Table
                                columns={columns}
                                dataSource={filteredData} // Hiển thị danh sách đã lọc dựa trên nội dung tìm kiếm
                            />
                        ) : (
                            <p className="notfound-notification">Không tìm thấy điểm đến nào</p>
                        )}
                    </div>
                </>
            )}
            {/* Thông báo xác nhận xóa */}
            <Modal
                title="Xác nhận xóa"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p>Bạn chắc chắn muốn xóa điểm đến này ? </p>
            </Modal>
        </div>
    )
}

export default DestinationList;
