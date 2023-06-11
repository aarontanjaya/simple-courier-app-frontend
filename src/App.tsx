import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import LayoutUser from './components/LayoutUser/LayoutUser';
import Address from './pages/Address';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping from './pages/Shipping';
import NewShipping from './pages/NewShipping';
import Payment from './pages/Payment';
import TopUp from './pages/TopUp';
import LayoutAdmin from './components/LayoutAdmin/LayoutAdmin';
import AddressAdmin from './pages/AddressAdmin';
import Promo from './pages/Promo';
import ShippingAdmin from './pages/ShippingAdmin';
import AdminReport from './pages/AdminReport';
import ProtectedPageUser from './components/ProtectedPageUser/ProtectedPageUser';
import ProtectedPageAdmin from './components/ProtectedPageAdmin/ProtectedPageAdmin';
import Gacha from './pages/Gacha';
import Logout from './pages/Logout';
import ProtectedPageGuest from './components/ProtectedPageGuest/ProtectedPageGuest';
function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedPageGuest />}>
          <Route path='/' element={<p>Redirecting...</p>}/>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route element={<ProtectedPageUser />}>
          <Route element={<LayoutUser />}>
            <Route path='profile' element={<Profile />} />
            <Route path='addresses' element={<Address />} />\
            <Route path='shippings/:id/payment' element={<Payment />} />
            <Route path='shippings' element={<Shipping />} />
            <Route path='new-shipping' element={<NewShipping />} />
            <Route path='top-up' element={<TopUp />} />
            <Route path='gacha' element={<Gacha />} />
          </Route>
        </Route>
        <Route element={<ProtectedPageAdmin />}>
          <Route element={<LayoutAdmin />}>
            <Route path='/admin/shippings' element={<ShippingAdmin />} />
            <Route path='/admin/profile' element={<Profile />} />
            <Route path='/admin/addresses' element={<AddressAdmin />} />
            <Route path='/admin/promos' element={<Promo />} />
            <Route path='/admin/reports' element={<AdminReport />} />
          </Route>
        </Route>
        <Route path='logout' element={<Logout />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
