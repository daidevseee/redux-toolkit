import React, { useEffect } from 'react'
import { fetchCategories } from '../../../features/client/cateSlide';
import { fetchinfos } from '../../../features/admin/infoSlide';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
export default function Header() {
  const dispatch = useDispatch();
  const category = useSelector ((state) =>state.category);
  const info = useSelector ((state) =>state.info);
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchinfos());
  }, [dispatch]);
  const LogoInfo = info.find((item) => item.id === 'X6qWXfdJYiOVc0iBGN8E');
  return (
    <>
        <div className="navbar bg-base-300">
  <div className="navbar-start">
    {LogoInfo  && (

    <Link to={'/'} className="btn btn-ghost normal-case text-xl">{LogoInfo.name_web}</Link>
    )}
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Home </a></li>
      <li tabIndex={0}>
        <details>
          <summary>Danh Mục</summary>
          <ul  className="p-2 bg-slate-950 !important" >
            {category.map((cate)=>
            <li><a className='block text-white !important'>{cate.name}</a></li>
            
            )}
            {/* <li><a className='text-white !important'>Submenu 2</a></li> */}
          </ul>
        </details>
      </li>
      <li><a>Giỏ hàng </a></li>
    </ul>
  </div>
  <div className="navbar-end">
  
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
  </div>

    </>
  )
}
