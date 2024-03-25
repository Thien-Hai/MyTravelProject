import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Input, Modal, Spin } from 'antd';
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const { Search } = Input;

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'name',
    },
    {
        title: 'Thể loại tin tức',
        dataIndex: 'category',
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updateDay',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const TravelTipList = () => {
    const [data1, setData1] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingTravelTip, setDeletingTravelTip] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    dayjs.locale('vi');
    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const formattedDate = date.format('dddd, DD/MM/YYYY');

        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    // Function xử lý sự kiện khi người dùng thay đổi nội dung trong thanh tìm kiếm
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    // Function lọc danh sách các destination dựa trên nội dung tìm kiếm
    const filteredData = data1.filter(tip => tip.name.toLowerCase().includes(searchText.toLowerCase()));

    // Kiểm tra xem có dữ liệu destination nào trong danh sách đã lọc hay không
    const isDataFound = filteredData.length > 0;


    useEffect(() => {
        // Thực hiện yêu cầu HTTP để lấy danh sách các điểm đến từ backend
        axios.get('http://localhost:5000/travelTips')
            .then(response => {
                // Chuyển đổi dữ liệu thành dạng phù hợp để hiển thị trong bảng
                const formattedData = response.data.sort((a, b) => a.id - b.id).map((tip, index) => ({
                    key: index + 1,
                    name: tip.name,
                    category: tip.category,
                    updateDay: formatDateTime(tip.updatedAt),
                    action: (
                        <Space size="middle">
                            <Link to={`/admin/cap-nhat-tin-tuc/${tip.id}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                            <a onClick={() => showDeleteConfirmation(tip)} className="delete-button"> <AiOutlineDelete className="mb-1" /> Xóa </a>
                        </Space>
                    )
                }));
                // Lưu dữ liệu vào state
                setData1(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tips:', error);
                setLoading(false);
            });
    }, []);

    const showDeleteConfirmation = (tip) => {
        setDeletingTravelTip(tip);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:5000/travelTips/${deletingTravelTip.id}`)
            .then(response => {
                axios.get('http://localhost:5000/travelTips')
                    .then(response => {
                        // Chuyển đổi dữ liệu thành dạng phù hợp để hiển thị trong bảng
                        const formattedData = response.data.sort((a, b) => a.id - b.id).map((tip, index) => ({
                            key: index + 1,
                            name: tip.name,
                            category: tip.category,
                            updateDay: formatDateTime(tip.updatedAt),
                            action: (
                                <Space size="middle">
                                    <Link to={`/admin/cap-nhat-tin-tuc/${tip.id}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                                    <a onClick={() => showDeleteConfirmation(tip)} className="delete-button"> <AiOutlineDelete className="mb-1" /> Xóa </a>
                                </Space>
                            )
                        }));
                        // Lưu dữ liệu vào state
                        setData1(formattedData);
                        // Đóng thông báo xác nhận xóa
                        setDeleteModalVisible(false);
                    })
                    .catch(error => {
                        console.error('Error fetching tips:', error);
                        // Đóng thông báo xác nhận xóa
                        setDeleteModalVisible(false);
                    });
            })
            .catch(error => {
                console.error('Error deleting tip:', error);
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
                <Search placeholder="Tìm tin tức theo tên..."
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
                <p>Bạn chắc chắn muốn xóa tin tức này ? </p>
            </Modal>
        </div>
    )
}

export default TravelTipList;
