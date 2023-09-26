import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchinfos, updateInfo } from '../../../features/admin/infoSlide';
import { Link } from 'react-router-dom';
import EditModal from './EditModal';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Infoweb = () => {
  const dispatch = useDispatch();
  
  const [editingInfo, setEditingInfo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const info = useSelector ((state) =>state.info);
  useEffect(() => {
    dispatch(fetchinfos());
  }, [dispatch]);
  const handleEditInfo = (info) => {
    setEditingInfo(info);
    setIsEditModalOpen(true);
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingInfo({
      ...editingInfo,
      [name]: value,
    });
  };
  
  const handleUpdateSubmit = () => {
    dispatch(updateInfo(editingInfo));
    setEditingInfo(null);
    setIsEditModalOpen(false); 
    toast.success('Sửa Thành Công')
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
    < ToastContainer/>
    <Helmet>
      <title>Thông Tin Website</title>
    </Helmet>
    {info.map((infos) =>
    <div className='flex justify-end mr-5'>

    <button onClick={() => handleEditInfo(infos)} className='btn btn-outline'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

    </button>
    </div>
    )}
    
    <div className="min-w-screen flex items-center justify-center px-5 py-5">
  <div
    className="rounded-lg shadow-xl bg-gray-900 text-white"
    style={{ width: 1000 }}
  >
    <div className="border-b border-gray-800 px-8 py-3">
      <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500" />
      <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300" />
      <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400" />
    </div>
    {info.map((infos) =>
    
    <div key={infos.id} className="px-8 py-6">
      <p>
        <em className="text-blue-400">const</em>{" "}
        <span className="text-green-400">WebsiteInformation</span>{" "}
        <span className="text-pink-500">=</span>{" "}
        <em className="text-blue-400">function</em>() {"{"}
      </p>
      <p>
        &nbsp;&nbsp;<span className="text-pink-500">return</span> {"{"}
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;name:{" "}
        <span className="text-yellow-300">'{infos.name_web}'</span>,
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;developer:{" "}
        <span className="text-yellow-300">'{infos.dev}'</span>,
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;website:{" "}
        <span className="text-yellow-300">
          '
          <Link
            to={'/'}
            target="_blank"
            className="text-yellow-300 hover:underline focus:border-none"
            >
            {infos.url}
          </Link>
          '
        </span>,
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Slogan:{" "}
              <span className="text-yellow-300">'{infos.slogan}'</span>,
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Footer Copyright:{" "}
              <span className="text-yellow-300">'{infos.footer_copyright}'</span>,
            </p>
        
      </p>
      <p>&nbsp;&nbsp;{"}"}</p>
      <p>{"}"}</p>
    </div>
    )}
  </div>
</div>
<EditModal className='modal-info'
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        editingInfo={editingInfo}
        handleInputChange={handleInputChange}
        handleUpdateSubmit={handleUpdateSubmit}
      />
    </>

  )
}
export default Infoweb
