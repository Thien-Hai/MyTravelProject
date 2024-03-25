import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Empty, Input, Select, Modal } from 'antd';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const { Search } = Input;

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tour',
        dataIndex: 'tour',
    },
    {
        title: 'Khách hàng đặt',
        dataIndex: 'user',
    },
    {
        title: 'Tổng thanh toán',
        dataIndex: 'totalPrice',
    },
    {
        title: 'Phương thức & Trạng thái',
        dataIndex: 'status',
    },
    {
        title: 'Thời gian đặt',
        dataIndex: 'timeBooking',
    },
];

const InvoiceList = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const showConfirmModal = (invoiceId, status) => {
        setSelectedInvoiceId(invoiceId);
        setSelectedStatus(status);
        setConfirmModalVisible(true);
    };

    dayjs.locale('vi');
    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const formattedDate = date.format('dddd, DD/MM/YYYY');

        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    const handleConfirm = () => {
        if (selectedInvoiceId && selectedStatus) {
            if (selectedStatus === 'hủy đơn') {
                // Nếu là "hủy đơn", gọi API DELETE
                axios.delete(`http://localhost:5000/invoices/${selectedInvoiceId}`)
                    .then(response => {
                        toast.success("Hủy đơn thành công",
                            {
                                delay: 100,
                                autoClose: 4000,
                                position: 'top-center',
                                style: {
                                    width: '400px',
                                },
                            })
                    })
                    .catch(error => {
                        console.error('Lỗi khi hủy hóa đơn', error);
                    });
            } else {
                // Nếu không phải "hủy đơn", gọi API PATCH để thay đổi trạng thái
                const isPurchased = selectedStatus === 'đã thanh toán';

                axios.patch(`http://localhost:5000/invoices/${selectedInvoiceId}`, { isPurchased })
                    .then(response => {
                        toast.success("Thay đổi trạng thái thanh toán thành công",
                            {
                                delay: 100,
                                autoClose: 4000,
                                position: 'top-center',
                                style: {
                                    width: '400px',
                                },
                            })
                    })
                    .catch(error => {
                        console.error('Lỗi khi cập nhật hóa đơn:', error);
                    });
            }
            setConfirmModalVisible(false);
            window.location.reload();
        }
    };

    const handleCancel = () => {
        setConfirmModalVisible(false);
        window.location.reload();
    };

    const handleChange = (value, invoiceId) => {
        // Hiển thị modal xác nhận cho mọi trạng thái
        showConfirmModal(invoiceId, value);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/invoices')
            .then(response => {
                const formattedData = response.data
                    .sort((a, b) => a.id - b.id)
                    .map((invoice, index) => {
                        const defaultStatus = invoice.isPurchased ? 'đã thanh toán' : 'chưa thanh toán';
                        return {
                            key: index + 1,
                            tour: invoice.tour.name,
                            user: invoice.user.username,
                            totalPrice: invoice.totalPrice.toLocaleString() + ' VNĐ',
                            status: (
                                <div>
                                    <div className='mb-3'>{invoice.paymentMethod}</div>
                                    <div>
                                        <Select
                                            defaultValue={defaultStatus}
                                            style={{
                                                width: 150,
                                            }}
                                            onChange={(value) => handleChange(value, invoice.id)}
                                            options={[
                                                {
                                                    value: 'đã thanh toán',
                                                    label: 'Đã thanh toán',
                                                },
                                                {
                                                    value: 'chưa thanh toán',
                                                    label: 'Chưa thanh toán',
                                                },
                                                {
                                                    value: 'hủy đơn',
                                                    label: 'Hủy đơn',
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            ),
                            timeBooking: formatDateTime(invoice.createdAt),
                        };
                    });

                setData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter(invoice => invoice.user.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => a.id - b.id);

    const isDataFound = filteredData.length > 0;

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <Search placeholder="Tìm đơn đặt tour theo tên khách hàng..."
                    value={searchText}
                    onChange={handleSearchChange}
                    enterButton
                    style={{
                        width: 500,
                    }} />
            </div>
            <h4 className="mt-4"> Danh sách các đơn đặt tour </h4>
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
                            <Empty description="Không có dữ liệu" style={{ marginTop: '150px' }} />
                        )}
                    </div>
                </>
            )}
            <Modal
                title="Xác nhận thay đổi trạng thái đơn đặt tour"
                visible={confirmModalVisible}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <p style={{ fontSize: '15px' }}>{`Bạn chắc chắn muốn thay đổi trạng thái đơn đặt tour này thành "${selectedStatus}"?`}</p>
            </Modal>
        </div>
    )
}

export default InvoiceList;
