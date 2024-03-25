import React, { useState, useEffect } from 'react'
import { Table, Space, Modal } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tổng tiền hàng',
        dataIndex: 'totalPrice',
    },
    {
        title: 'Địa chỉ nhận hàng',
        dataIndex: 'address',
    },
    {
        title: 'Phương thức thanh toán',
        dataIndex: 'paymentMethod',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
    },
];

const Orders = () => {
    const [data1, setData1] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/invoices')
            .then(response => {
                const formattedData = response.data.map((invoice, index) => ({
                    key: index + 1,
                    totalPrice: invoice.totalPrice.toLocaleString() + ' VNĐ',
                    address: invoice.addressDetail + ', ' + invoice.ward + ', ' + invoice.district + ', ' + invoice.province,
                    paymentMethod: invoice.paymentMethod,
                    action: (
                        <Space size="middle">
                            <Link to={`/admin/chi-tiet-don-hang/${invoice.id}`} className="edit-brand-link"> <BiDetail className="mb-1" /> Xem chi tiết </Link>
                        </Space>
                    )
                }));
                // Lưu dữ liệu vào state
                setData1(formattedData);
            })
            .catch(error => {
                console.error('Error fetching invoices:', error);
            });
    }, []);

    return (
        <div>
            <h4 className="mt-4"> Danh sách các đơn hàng </h4>
            <div>
                <Table
                    columns={columns}
                    dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders