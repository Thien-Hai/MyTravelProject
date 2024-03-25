import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs"
import { Column } from '@ant-design/plots';

const Dashboard = () => {
    const data = [
        {
            type: 'Tháng 1',
            sales: 67,
        },
        {
            type: 'Tháng 2',
            sales: 60,
        },
        {
            type: 'Tháng 3',
            sales: 51,
        },
        {
            type: 'Tháng 4',
            sales: 81,
        },
        {
            type: 'Tháng 5',
            sales: 55,
        },
        {
            type: 'Tháng 6',
            sales: 84,
        },
        {
            type: 'Tháng 7',
            sales: 73,
        },
        {
            type: 'Tháng 8',
            sales: 69,
        },
        {
            type: 'Tháng 9',
            sales: 76,
        },
        {
            type: 'Tháng 10',
            sales: 74,
        },
        {
            type: 'Tháng 11',
            sales: 48,
        },
        {
            type: 'Tháng 12',
            sales: 56,
        },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        color: ({ type }) => {
            return 'hsl(19, 83%, 91%)';
        },
        label: {
            position: 'middle',
            style: {
                fill: 'hsl(242, 94%, 14%)',
                opacity: 1,
                fontSize: 14,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Month',
            },
            sales: {
                alias: 'Income',
            },
        },
    };

    return (
        <div style={{ color: 'hsl(242, 94%, 14%)' }}>
            <h3 className="mb-4">Bảng thống kê</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Tổng doanh thu tháng 12/2023</p>
                        <h6 className="mb-0">16.440.000.000 VNĐ</h6>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red"> <BsArrowDownRight /> 15% </h6>
                        <p className="mb-0"> so với tháng trước </p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Giá trị trung bình đơn đặt tour</p> <h6 className="mb-0">31.200.000 VNĐ</h6>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green"> <BsArrowUpRight /> 4% </h6>
                        <p className="mb-0"> so với tháng trước </p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
                    <div>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Tổng đơn đặt tour</p> <h6 className="mb-0">250</h6>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green"> <BsArrowUpRight /> 12% </h6>
                        <p className="mb-0"> so với tháng trước </p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mt-4"> Thống kê doanh thu theo tháng ( đơn vị: tỷ VNĐ) </h3>
                <br />
                <div>
                    <Column {...config} />
                </div>
            </div>
            <br />
        </div>
    )
}

export default Dashboard