import React, { Suspense, useState, useEffect } from 'react'
import axios from 'axios';
import axiosInstance from "../axios/instance";
import { useParams } from "react-router-dom";
import { Pagination, Spin, Empty } from 'antd';
import { BsSearch } from 'react-icons/bs';
const TravelTipCard = React.lazy(() => import('../components/TravelTipCard'));

const TravelTips = () => {
    const pageSize = 5;
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

    const [travelTips, settravelTips] = useState([]);
    const [filterData, setfilterData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/travelTips')
            .then(response => {
                settravelTips(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching travelTips:', error);
                setLoading(false);
            });
    }, []);

    const handleSortChange = (value) => {
        let filteredData = [...travelTips];

        switch (value) {
            case 'travel-news':
                filteredData = filteredData.filter(travelTip => travelTip.category === 'Tin tức du lịch');
                break;
            case 'travel-tips':
                filteredData = filteredData.filter(travelTip => travelTip.category === 'Cẩm nang du lịch');
                break;
            case 'travel-experiences':
                filteredData = filteredData.filter(travelTip => travelTip.category === 'Kinh nghiệm du lịch');
                break;
            default:
                break;
        }

        setfilterData(filteredData);
    };


    const filteredData = filterData
        .sort((a, b) => a.id - b.id)
        .filter(destination => destination.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <div style={{ paddingTop: '70px', height: '1650px' }}>
                <div className="store-wrapper home-wrapper-2 py-5">
                    <div className="container-xxl">
                        <div className="d-flex row justify-content-center">
                            <div className="filter-sort-grid mb-4" >
                                <div className="d-flex justify-content-between align-items-center" style={{ marginLeft: '-2%', marginBottom: '-1%' }}>
                                    <div className="d-flex align-items-center gap-10" style={{ zoom: '1.1' }}>
                                        <p className="filter-title"
                                            style={{ marginTop: '0', marginBottom: '0', width: '85px' }}> Lọc theo </p>
                                        <select className="form-control form-select" style={{ width: '200px' }}
                                            id="">
                                            <option value="manual"> Mặc định </option>
                                            <option value="travel-news"> Tin tức du lịch </option>
                                            <option value="travel-tips"> Cẩm nang du lịch </option>
                                            <option value="travel-experiences"> Kinh nghiệm du lịch </option>
                                        </select>
                                    </div>
                                    <div className="input-search mb-3 align-items-center" style={{ marginRight: '-4.6%' }}>
                                        <input
                                            type="text"
                                            className="form-control py-2"
                                            placeholder="Tìm tin tức ..."
                                            aria-label="Tìm tin tức ..."
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
                            <div>
                                <div >
                                    {loading ? (
                                        <div style={{ marginTop: '200px', color: 'red' }} >
                                            <Spin tip="Đang tải dữ liệu..." size="large">
                                                <div className="content" />
                                            </Spin>
                                        </div>
                                    ) : (
                                        <>
                                            {travelTips.length > 0 ? (
                                                <div style={{ marginLeft: '-2%', marginRight: '-2%' }}>
                                                    {travelTips.slice(startIndex, endIndex).map(travelTip => (
                                                        <div key={travelTip.id} >
                                                            <Suspense fallback={<div></div>}>
                                                                <TravelTipCard travelTip={travelTip} />
                                                            </Suspense>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Empty description="Không có dữ liệu" style={{ marginTop: '50px' }} />
                                            )}
                                        </>
                                    )}
                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    current={currentPage}
                                    onChange={handlePageChange}
                                    total={travelTips.length}
                                    pageSize={pageSize}
                                    showSizeChanger={false}
                                />

                            </div>
                        </div>
                    </div >

                </div >
            </div>
        </>
    )
}

export default TravelTips
