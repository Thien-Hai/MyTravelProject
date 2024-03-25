import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal } from 'antd';
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Họ tên',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const CustomersAdmin = () => {
    const [data, setData] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletingCustomer, setDeletingCustomer] = useState(null);
    const [searchText, setSearchText] = useState('');

    // Function xử lý sự kiện khi người dùng thay đổi nội dung trong thanh tìm kiếm
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    // Function lọc danh sách các customer dựa trên nội dung tìm kiếm
    const filteredData = data.filter(customer => customer.email.toLowerCase().includes(searchText.toLowerCase()));

    // Kiểm tra xem có dữ liệu customer nào trong danh sách đã lọc hay không
    const isDataFound = filteredData.length > 0;

    useEffect(() => {
        // Thực hiện yêu cầu HTTP để lấy danh sách các users từ backend
        axios.get('http://localhost:5000/users')
            .then(response => {
                // Chuyển đổi dữ liệu thành dạng phù hợp để hiển thị trong bảng
                const formattedData = response.data
                    .filter(user => !user.isAdmin)
                    .map((user, index) => ({
                        key: index + 1,
                        name: user.username,
                        email: user.email,
                        action: (
                            <Space size="middle">
                                <Link to={`/admin/chi-tiet-khach-hang/${user.id}`} className="edit-brand-link">
                                    <AiOutlineEye className="mb-1" /> Chi tiết
                                </Link>
                                <a onClick={() => showDeleteConfirmation(user)} className="delete-button">
                                    <AiOutlineDelete className="mb-1" /> Xóa
                                </a>
                            </Space>
                        ),
                    }));
                // Lưu dữ liệu vào state
                setData(formattedData);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const showDeleteConfirmation = (customer) => {
        setDeletingCustomer(customer);
        setDeleteModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        // Thực hiện yêu cầu DELETE đến backend để xóa customer
        axios.delete(`http://localhost:5000/users/${deletingCustomer.id}`)
            .then(response => {
                // Sau khi xóa thành công, lấy lại danh sách các users từ backend
                axios.get('http://localhost:5000/users')
                    .then(response => {
                        // Chuyển đổi dữ liệu thành dạng phù hợp để hiển thị trong bảng
                        const formattedData = response.data
                            .filter(user => !user.isAdmin)
                            .map((user, index) => ({
                                key: index + 1,
                                name: user.username,
                                email: user.email,
                                action: (
                                    <Space size="middle">
                                        <Link to={`/admin/chi-tiet-khach-hang/${user.id}`} className="edit-brand-link">
                                            <AiOutlineEye className="mb-1" /> Chi tiết
                                        </Link>
                                        <a onClick={() => showDeleteConfirmation(user)} className="delete-button">
                                            <AiOutlineDelete className="mb-1" /> Xóa
                                        </a>
                                    </Space>
                                ),
                            }));
                        // Lưu dữ liệu vào state
                        setData(formattedData);
                        // Đóng thông báo xác nhận xóa
                        setDeleteModalVisible(false);
                    })
                    .catch(error => {
                        console.error('Error fetching users:', error);
                        // Đóng thông báo xác nhận xóa
                        setDeleteModalVisible(false);
                    });
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
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
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Tìm khách hàng ..."
                    aria-label="Tìm khách hàng ..."
                    aria-describedby="basic-addon2"
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                    <BsSearch className="fs-6" />
                </span>
            </div>
            <h4 className="mt-4"> Danh sách các khách hàng </h4>
            <div>
                {isDataFound ? (
                    <Table
                        columns={columns}
                        dataSource={filteredData} // Hiển thị danh sách đã lọc dựa trên nội dung tìm kiếm
                    />
                ) : (
                    <p className="notfound-notification">Không tìm thấy khách hàng nào</p>
                )}
            </div>
            {/* Thông báo xác nhận xóa */}
            <Modal
                title="Xác nhận xóa"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Xóa"
                cancelText="Hủy"
            >
                <p>Bạn chắc chắn muốn xóa khách hàng này ? </p>
            </Modal>
        </div>
    );
};

export default CustomersAdmin;
