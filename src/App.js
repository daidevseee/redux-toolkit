import React from 'react';
import { BrowserRouter as Router, Routes, Route,Outlet } from 'react-router-dom';
import ClientLayout from './component/Client/page/ClientLayout';
import AdminLayout from './component/Admin/page/AdminLayout';
import Login from './auth/Login';
function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/" element={<ClientLayout />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
