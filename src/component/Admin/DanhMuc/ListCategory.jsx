import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import {deleteCategory,updateCategory} from '../../../features/admin/cateSlide';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CateFrom from './CateFrom'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import { Helmet } from 'react-helmet';
const ListCategory = ({cates}) => {
  const dispatch = useDispatch();
  const [editingCate, setEditingCate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingCate, setDeletingCate] = useState(null);

  
  const handleDeleteCate = (cate) => {
    setDeletingCate(cate);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (deletingCate) {
      dispatch(deleteCategory(deletingCate.id));
      setDeletingCate(null);
      setIsModalOpen(false);
      toast.success('Xóa thành công');
    }
  };
  const handleEditCate = (cate) => {
    setEditingCate(cate);
    setIsEditModalOpen(true);
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCate({
      ...editingCate,
      [name]: value,
    });
  };
  
  const handleUpdateSubmit = () => {
    dispatch(updateCategory(editingCate));
    setEditingCate(null);
    setIsEditModalOpen(false); 
    toast.success('Sửa Thành Công')
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
      <CateFrom/>
      <Helmet>
        <title>Quản Lí Danh Mục</title>
      </Helmet>
      <ToastContainer/>
      <div  className="overflow-x-auto">
        {cates?.length === 0 ? (
            <div className='no-data'>No data available.</div>
          ) : (
          <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name Category</th>
              <th>Status</th>
              <th>Option</th>
              
            </tr>
          </thead>
      {cates?.map((cate) => (
        <tbody key={cate.id}>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={cate.avt} alt="Avatar" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{cate.name}</div>
                    {/* <div className="text-sm opacity-50">{todo.nation}</div> */}
                  </div>
                </div>
              </td>
              <td>
                {cate.status}
                <br/>
                <span className="badge badge-ghost badge-sm">Status</span>
              </td>
              {/* <td>{todo.old}</td> */}
              <th>
                <button  className='btn btn-ghost bnt-xs' onClick={() => handleEditCate(cate)}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"/>
                </svg></button>
                <button  onClick={() => handleDeleteCate(cate)} className="btn btn-ghost btn-xs"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
              </svg></button>
              </th>
              
              
            </tr>
          </tbody>
            ))}
          
          <tfoot>
            <tr>
              <th></th>
              <th>Name Category</th>
              <th>Status</th>
              <th>Option</th>
              <th></th>
            </tr>
          </tfoot>
          
        </table>
      )}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        deletingCate={deletingCate}
        handleConfirmDelete={handleConfirmDelete}
        handleCloseModal={handleCloseModal}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        editingCate={editingCate}
        handleInputChange={handleInputChange}
        handleUpdateSubmit={handleUpdateSubmit}
      />
    </>
  )
}
export default ListCategory;