import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeUser from './pages/HomeUser';
import LayoutUser from './components/LayoutUser';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import SingleTourUser from './pages/SingleTourUser';
import DashboardAdmin from "./pages/DashboardAdmin";
import LayoutAdmin from "./components/LayoutAdmin";
import TourlistAdmin from './pages/TourlistAdmin'
import EditTourAdmin from './pages/EditTourAdmin';
import AddTourAdmin from './pages/AddTourAdmin';
import TourTypeListAdmin from './pages/TourTypeListAdmin';
import EditTourTypeAdmin from './pages/EditTourTypeAdmin';
import AddTourTypeAdmin from './pages/AddTourTypeAdmin';
import DestinationListAdmin from './pages/DestinationListAdmin';
import EditDestinationAdmin from './pages/EditDestinationAdmin';
import AddDestinationAdmin from './pages/AddDestinationAdmin';
import AddTravelTipAdmin from './pages/AddTravelTipAdmin';
import TourTypeDetail from './pages/TourTypeDetail';
import DestinationDetail from './pages/DestinationDetail';
import Destinations from './pages/Destinations';
import TravelTips from './pages/TravelTips';
import Checkout from './pages/CheckoutUser';
import AllTourPage from './pages/AllTourPage';
import DomesticTourPage from './pages/DomesticTourPage';
import InternationalTourPage from './pages/InternationalTourPage';
import DiscountTourPage from './pages/DiscountTourPage';
import ProfileUser from './pages/ProfileUser';
import UserListAdmin from './pages/UserListAdmin';
import InvoiceListAdmin from './pages/InvoiceListAdmin';
import FindTourPage from './pages/FindTourPage';
import TravelTipDetail from './pages/TravelTipDetail';
import TravelTipListAdmin from './pages/TravelTipListAdmin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route path="/" element={<LayoutUser />}>
            <Route index element={<HomeUser />} />
            <Route path="/tất-cả-tour" element={<AllTourPage />} />
            <Route path="/tìm-kiếm-tour" element={<FindTourPage />} />
            <Route path="/tour-trong-nước" element={<DomesticTourPage />} />
            <Route path="/tour-nước-ngoài" element={<InternationalTourPage />} />
            <Route path="/tour-giảm-giá" element={<DiscountTourPage />} />
            <Route path="tour/:id" element={<SingleTourUser />} />
            <Route path="Du-lịch/:destinationName" element={<DestinationDetail />} />
            <Route path="/Điểm-đến" element={<Destinations />} />
            <Route path="/:tourTypeName" element={<TourTypeDetail />} />
            <Route path="/Tin-tức" element={<TravelTips />} />
            <Route path="đặt-tour/:id" element={<Checkout />} />
            <Route path="/Liên-hệ" element={<Contact />} />
            <Route path="/thông-tin-cá-nhân" element={<ProfileUser />} />
            <Route path="/tin-tức/:travelTipName" element={<TravelTipDetail />} />
            {/* <Route path="blog/:id" element={<SingleBlog />} /> */}
          </Route>

          <Route path="/admin" element={<LayoutAdmin />} >
            <Route index element={<DashboardAdmin />} />

            <Route path="/admin/danh-sach-cac-tour" element={<TourlistAdmin />} />
            <Route path="/admin/cap-nhat-tour/:id" element={<EditTourAdmin />} />
            <Route path="/admin/them-moi-tour" element={<AddTourAdmin />} />

            <Route path="/admin/danh-sach-cac-loai-tour" element={<TourTypeListAdmin />} />
            <Route path="/admin/cap-nhat-loai-tour/:tourTypeName" element={<EditTourTypeAdmin />} />
            <Route path="/admin/them-moi-loai-tour" element={<AddTourTypeAdmin />} />

            <Route path="/admin/danh-sach-cac-diem-den" element={<DestinationListAdmin />} />
            <Route path="/admin/cap-nhat-diem-den/:destinationId" element={<EditDestinationAdmin />} />
            <Route path="/admin/them-moi-diem-den" element={<AddDestinationAdmin />} />

            <Route path="/admin/danh-sach-cac-tin-tuc" element={<TravelTipListAdmin />} />
            <Route path="/admin/them-moi-tin-tuc" element={<AddTravelTipAdmin />} />

            <Route path="/admin/danh-sach-khach-hang" element={<UserListAdmin />} />
            <Route path="/admin/danh-sach-don-dat-tour" element={<InvoiceListAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
