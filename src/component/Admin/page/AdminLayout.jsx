import React,{useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos} from '../../../features/admin/adminSlice';
import { fetchCategories} from '../../../features/admin/cateSlide';
import { fetchinfos} from '../../../features/admin/infoSlide';
import { Outlet, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './header';
import SanPham from '../SanPham/TodoList';
import DanhMuc from '../DanhMuc/ListCategory'
import Infoweb from './infoweb';
import {auth} from '../../../Service/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Helmet } from 'react-helmet';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const cates = useSelector ((state) => state.cates);
    const info = useSelector ((state) => state.info);
    useEffect(() => {
        dispatch(fetchTodos());
        dispatch(fetchCategories());
        dispatch(fetchinfos());
    }, [dispatch]);
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
      dispatch(fetchTodos());
      dispatch(fetchCategories());
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setIsLoading(false);
      });
      
      return () => unsubscribe();
    }, [dispatch]);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/admin/login" />;
    }
    console.log(info);
  return (
    <>
      <Helmet>
          <title>Admin-Dashboard</title>
      </Helmet>
      <Header />
      <Outlet /> 
      {location.pathname === '/admin' && (
        <h1 style={{ textAlign: 'center', marginTop: '15%', fontSize: '30px' }}>Đây là Admin-Dashboard</h1>
      )}
      {location.pathname === '/admin/san-pham' && (
        <h1 style={{ textAlign: 'center', marginTop: '1%', fontSize: '30px' }}>Sản Phẩm</h1>
      )}
      {location.pathname === '/admin/danh-muc' && (
        <h1 style={{ textAlign: 'center', marginTop: '1%', fontSize: '30px' }}>Danh Mục</h1>
      )}
      {location.pathname === '/admin/thong-tin-website' && (
        <h1 style={{ textAlign: 'center', marginTop: '1%', fontSize: '30px' }}>Thông tin Website</h1>
      )}
      <Routes>
        <Route path="/san-pham" element={<SanPham todos={todos} />} />
        <Route path="/danh-muc" element={<DanhMuc cates={cates} />} />
        <Route path='/thong-tin-website' element={<Infoweb />}></Route>
      </Routes>
    </>
  );
};

export default AdminLayout;
