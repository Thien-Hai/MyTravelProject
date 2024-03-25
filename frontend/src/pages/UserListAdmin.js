import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Empty, Input } from 'antd';

const { Search } = Input;

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
    },
];

const UserList = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                const formattedData = response.data
                    .sort((a, b) => a.id - b.id)
                    .filter((user) => !user.isAdmin)
                    .map((user, index) => ({
                        key: index + 1,
                        name: user.username,
                        email: user.email,
                        phone: user.phoneNumber,
                    }));

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

    console.log(data);
    const filteredData = data.filter(user => user.phone.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => a.id - b.id);

    const isDataFound = filteredData.length > 0;

    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <Search placeholder="Tìm người dùng theo số điện thoại..."
                    value={searchText}
                    onChange={handleSearchChange}
                    enterButton
                    style={{
                        width: 500,
                    }} />
            </div>
            <h4 className="mt-4"> Danh sách các khách hàng </h4>
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
        </div>
    )
}

export default UserList;
