import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser, AiFillFolderOpen } from "react-icons/ai";
import { BiCategoryAlt, BiSolidCategoryAlt } from "react-icons/bi";
import { SiYourtraveldottv } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { ImBlog, ImBlogger2 } from "react-icons/im";
import { Outlet } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbBrandBootstrap, TbBrandBooking } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    return (
        <Layout >
            <Sider width={240} trigger={null} collapsible collapsed={collapsed} className="col-4">
                <div className="logo">
                    <h2 className="text-white fs-5 text-center py-4 mb-0">
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'hsl(242, 94%, 14%)' }}> H-TRAVEL </span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => {
                        if (key === "signout") {

                        }
                        else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className="fs-4" />,
                            label: 'Thống kê',
                        },
                        {
                            key: 'danh-sach-khach-hang',
                            icon: <AiOutlineUser className="fs-4" />,
                            label: 'Khách hàng',
                        },
                        {
                            key: 'danh-sach-don-dat-tour',
                            icon: <FaClipboardList className="fs-4" />,
                            label: 'Các đơn đặt tour',
                        },
                        {
                            key: 'danh-muc',
                            icon: <AiFillFolderOpen className="fs-4" />,
                            label: 'Danh mục',
                            children: [
                                {
                                    key: 'danh-sach-cac-tour',
                                    icon: <SiYourtraveldottv className="fs-4" />,
                                    label: 'Các tour',
                                },
                                {
                                    key: 'them-moi-tour',
                                    icon: <MdOutlinePostAdd className="fs-4" />,
                                    label: 'Thêm tour',
                                },
                                {
                                    key: 'danh-sach-cac-loai-tour',
                                    icon: <BiSolidCategoryAlt className="fs-4" />,
                                    label: 'Các loại tour',
                                },
                                {
                                    key: 'them-moi-loai-tour',
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: 'Thêm loại tour',
                                },
                                {
                                    key: 'danh-sach-cac-diem-den',
                                    icon: <TbBrandBootstrap className="fs-4" />,
                                    label: 'Các điểm đến',
                                },
                                {
                                    key: 'them-moi-diem-den',
                                    icon: <TbBrandBooking className="fs-4" />,
                                    label: 'Thêm điểm đến',
                                },
                                {
                                    key: 'danh-sach-cac-tin-tuc',
                                    icon: <ImBlogger2 className="fs-4" />,
                                    label: 'Các tin tức',
                                },
                                {
                                    key: 'them-moi-tin-tuc',
                                    icon: <ImBlog className="fs-4" />,
                                    label: 'Thêm tin tức',
                                },

                            ]
                        },
                    ]}
                    itemRender={(item) => (
                        <span style={{ whiteSpace: "normal" }}>{item.label}</span>
                    )}
                />
            </Sider>
            <Layout className="custom-layout">
                <Header
                    className="d-flex justify-content-between ps-1 pe-5"
                    style={{ padding: 0, background: colorBgContainer, }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-4 align-items-center">
                        <h5 className="mb-0"> ADMIN </h5>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,

                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
            <ToastContainer />
        </Layout>
    );
};

export default MainLayout
