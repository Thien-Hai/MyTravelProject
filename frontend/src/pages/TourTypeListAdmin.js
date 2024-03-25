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
        title: 'Điểm đến',
        dataIndex: 'destinationNames',
        render: destinationNames => destinationNames.join(', '), // Render brand names as a comma-separated string
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const TourTypeListAdmin = () => {
    const [data, setData] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingTourType, setDeletingTourType] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter(tourType => tourType.name.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => a.id - b.id);
    console.log(filteredData);

    const isDataFound = filteredData.length > 0;

    useEffect(() => {
        axios.get('http://localhost:5000/tour-types/get-all-tour-types')
            .then(response => {
                const formattedData = response.data.sort((a, b) => a.id - b.id).map((tourType, index) => ({
                    key: index + 1,
                    name: tourType.name,
                    destinationNames: tourType.destinations.map(destination => destination.name),
                    action: (
                        <Space size="middle">
                            <Link to={`/admin/cap-nhat-loai-tour/${tourType.name}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                            <a onClick={() => showDeleteConfirmation(tourType)} className="delete-button"> <AiOutlineDelete className="mb-1" /> Xóa </a>
                        </Space>
                    )
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tour types:', error);
                setLoading(false);
            });
    }, []);

    const showDeleteConfirmation = (tourType) => {
        setDeletingTourType(tourType);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:5000/tour-types/${deletingTourType.id}`)
            .then(response => {
                axios.get('http://localhost:5000/tour-types/get-all-tour-types')
                    .then(response => {
                        const formattedData = response.data.map((tourType, index) => ({
                            key: index + 1,
                            name: tourType.name,
                            destinationNames: tourType.destinations.map(destination => destination.name),
                            action: (
                                <Space size="middle">
                                    <Link to={`/admin/cap-nhat-loai-tour/${tourType.name}`} className="edit-brand-link"> <BiEditAlt className="mb-1" /> Sửa </Link>
                                    <a onClick={() => showDeleteConfirmation(tourType)} className="delete-button"> <AiOutlineDelete className="mb-1" /> Xóa </a>
                                </Space>
                            )
                        }));
                        setData(formattedData);
                        setDeleteModalVisible(false);
                    })
                    .catch(error => {
                        console.error('Error fetching tour types:', error);
                        setDeleteModalVisible(false);
                    });
            })
            .catch(error => {
                console.error('Error deleting tour type:', error);
                setDeleteModalVisible(false);
            });
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <Search placeholder="Tìm loại tour theo tên..."
                    value={searchText}
                    onChange={handleSearchChange}
                    enterButton
                    style={{
                        width: 500,
                    }} />
            </div>
            <h4 className="mt-4">Danh sách các loại tour</h4>
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
                            />
                        ) : (
                            <p className="notfound-notification">Không tìm thấy loại tour nào</p>
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
                <p>Bạn chắc chắn muốn xóa loại tour này?</p>
            </Modal>
        </div>
    );
};

export default TourTypeListAdmin;
