import React,{useEffect} from 'react'
import {Outlet, Route, Routes, useLocation, Link} from 'react-router-dom'
import Header from './header'
import { useDispatch, useSelector } from 'react-redux';
import Footer from "./footer";
import { fetchinfos } from '../../../features/admin/infoSlide';
import ListProduct from './ListProduct';
import { Helmet } from 'react-helmet';
export default function ClientLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const info = useSelector ((state) =>state.info);
  useEffect(() => {
    dispatch(fetchinfos());
  }, [dispatch]);
  return (
    <>
    <Helmet>
      <title>Trang Chủ</title>
    </Helmet>
    <Header/>
    {location.pathname === '/' && (
        <div className="hero min-h-0	bg-base-200">
        <div className="p-5 text-center">
          <div className="max-w-md">
            {info.map((infos) =>
            <h1  className="text-5xl font-bold">{infos.slogan}</h1>
            )}
            <p className="py-6">Welcome to REACT SHOP, shop using redux-toolkit technology, Firebase, Auth Google.</p>
            <Link to={'/admin'} className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
      )}
      {location.pathname ==='/' && (
        <ListProduct/>
      )}
    <Outlet/>
    <Routes>
      <Route>

      </Route>
    </Routes>
        <Footer/>
    </>
  )
}
