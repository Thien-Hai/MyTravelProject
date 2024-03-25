import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal, Spin, Empty, Input } from 'antd';
import { AiOutlineDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

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
        title: 'Giá',
        dataIndex: 'price',
    },
    {
        title: 'Ngày khởi hành',
        dataIndex: 'departureDay',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const TourlistAdmin = () => {
    const [data, setData] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingTour, setDeletingTour] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter(tour => tour.name.toLowerCase().includes(searchText.toLowerCase()));

    const isDataFound = filteredData.length > 0;

    dayjs.locale('vi');
    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const formattedDate = date.format('dddd, DD/MM/YYYY');

        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/tours/get-all-tours')
            .then(response => {
                const formattedData = response.data.sort((a, b) => a.id - b.id).map((tour, index) => ({
                    key: index + 1,
                    name: tour.name,
                    price: tour.price.toLocaleString() + ' VNĐ',
                    departureDay: formatDateTime(tour.departureDay),
                    action: (
                        <Space size="middle">
                            <Link to={`/admin/cap-nhat-tour/${tour.id}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                            <a onClick={() => showDeleteConfirmation(tour)} className="delete-button"> <AiOutlineDelete className="mb-1" /> Xóa </a>
                        </Space>
                    )
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, []);

    const showDeleteConfirmation = (tour) => {
        setDeletingTour(tour);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:5000/tours/${deletingTour.id}`)
            .then(response => {
                axios.get('http://localhost:5000/tours/get-all-tours')
                    .then(response => {
                        const formattedData = response.data.map((tour, index) => ({
                            key: index + 1,
                            name: tour.name,
                            price: tour.price.toLocaleString() + ' VNĐ',
                            departureDay: tour.departureDay,
                            state: tour.state,
                            action: (
                                <Space size="middle">
                                    <Link to={`/admin/cap-nhat-tour/${tour.id}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                                    <a onClick={() => showDeleteConfirmation(tour)} className="delete-button"> <AiOutlineDelete className="mb-1" /> Xóa </a>
                                </Space>
                            )
                        }));
                        setData(formattedData);
                        setDeleteModalVisible(false);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching tour:', error);
                        setDeleteModalVisible(false);
                        setLoading(false);
                    });
            })
            .catch(error => {
                console.error('Error deleting tour:', error);
                setDeleteModalVisible(false);
            });
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <Search placeholder="Tìm tour theo tên..."
                    value={searchText}
                    onChange={handleSearchChange}
                    enterButton
                    style={{
                        width: 500,
                    }} />
            </div>
            <h4 className="mt-4">Danh sách các tour du lịch</h4>
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
                                dataSource={filteredData}
                                pagination={filteredData.length > 10 ? {} : false}
                            />
                        ) : (
                            <Empty description="Không có dữ liệu" style={{ marginTop: '100px' }} />
                        )}
                    </div>
                </>
            )}
            <Modal
                title="Xác nhận xóa"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p style={{ fontSize: '15px' }}>Bạn chắc chắn muốn xóa tour này?</p>
            </Modal>
        </div>
    );
};

export default TourlistAdmin;
