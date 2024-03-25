import React, { Suspense, useState, useEffect } from 'react'
import axios from 'axios';
import axiosInstance from "../axios/instance";
import { Pagination, Empty, Spin } from 'antd';
import { BsSearch } from 'react-icons/bs';
const DestinationCard = React.lazy(() => import('../components/DestinationCard'));

const Destinations = () => {
    const pageSize = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;

    const [destinations, setDestinations] = useState([]);
    const [filterData, setfilterData] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/destinations')
            .then(response => {
                setDestinations(response.data);
                setfilterData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching destinations:', error);
                setLoading(false);
            });
    }, []);

    const handleSortChange = (value) => {
        let filteredData = [...destinations];

        switch (value) {
            case 'domestic-destination':
                filteredData = filteredData.filter(destination => destination.location === 'Việt Nam');
                break;
            case 'international-destination':
                filteredData = filteredData.filter(destination => destination.location !== 'Việt Nam');
                break;
            default:
                filteredData = filteredData.sort((a, b) => {
                    return b.tours.length - a.tours.length
                });
                break;
        }

        setfilterData(filteredData);;
    };

    const filteredData = filterData
        .sort((a, b) => a.id - b.id)
        .sort((a, b) => b.tours.length - a.tours.length)
        .filter(destination => destination.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <div style={{ paddingTop: '70px', height: '1500px' }}>
                <div className="store-wrapper home-wrapper-2 py-5">
                    <div className="container-xxl">
                        <div className="d-flex row justify-content-center">
                            <div className="filter-sort-grid mb-4" >
                                <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '25px', marginLeft: '-6%' }}>
                                    <div className="d-flex align-items-center gap-10" style={{ zoom: '1.1' }}>
                                        <p className="filter-title" style={{ marginTop: '0', marginBottom: '0', width: '85px' }}> Lọc theo </p>
                                        <select className="form-control form-select" style={{ width: '210px', fontWeight: '500' }}
                                            id="" onChange={(e) => handleSortChange(e.target.value)}>
                                            <option value="manual"> Mặc định </option>
                                            <option value="domestic-destination"> Điểm đến trong nước </option>
                                            <option value="international-destination"> Điểm đến nước ngoài </option>
                                        </select>
                                    </div>
                                    <div className="input-search mb-3 align-items-center" style={{ marginRight: '-8.2%' }}>
                                        <input
                                            type="text"
                                            className="form-control py-2"
                                            placeholder="Tìm điểm đến ..."
                                            aria-label="Tìm điểm đến ..."
                                            aria-describedby="basic-addon2"
                                            value={searchText}
                                            onChange={handleSearchChange}
                                        />
                                        <span className="input-search p-3" id="basic-addon2" style={{ marginLeft: '-12.5%' }}>
                                            <BsSearch className="fs-6" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {loading ? (
                                <div style={{ marginTop: '200px', color: 'red' }} >
                                    <Spin tip="Đang tải dữ liệu..." size="large">
                                        <div className="content" />
                                    </Spin>
                                </div>
                            ) : (
                                <>
                                    {filteredData.length > 0 ? (
                                        <div className="destination section container">
                                            <div className="secContainer">
                                                <div className="destinationContainer grid" style={{ marginLeft: '-5%', marginRight: '-5%' }}>
                                                    {filteredData
                                                        .slice(startIndex, endIndex)
                                                        .map(destination => (
                                                            <div key={destination.id} className='col-3'>
                                                                <Suspense fallback={<div></div>}>
                                                                    <DestinationCard destination={destination} />
                                                                </Suspense>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Empty description="Không có dữ liệu" style={{ marginTop: '50px' }} />
                                    )}
                                </>
                            )}
                            {filteredData && filteredData.length > 20 ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Pagination
                                        current={currentPage}
                                        onChange={handlePageChange}
                                        total={filteredData.length}
                                        pageSize={pageSize}
                                        showSizeChanger={false}
                                    />
                                </div>
                            ) : (
                                <div> </div>
                            )}
                        </div>
                    </div >

                </div >
            </div>
        </>
    )
}

export default Destinations
