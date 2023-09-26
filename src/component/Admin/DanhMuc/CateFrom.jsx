import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {addCategory} from '../.././../features/admin/cateSlide';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CateFrom() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cate, setCate] = useState({
        name: '',
        avt: '',
        status:'',
      // Thêm các trường khác của Cate tại đây (ví dụ: priority, assignee, ...).
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCate({
          ...cate,
          [name]: value,
        });
      };
      const handleAddCate = () => {
        // Kiểm tra nếu tiêu đề rỗng hoặc chỉ chứa khoảng trắng
        if (cate.name.trim() === '') {
          return;
        }
    
        const newCate = {
          ...cate,
          name: cate.name.trim(),
          completed: false,
        };
        dispatch(addCategory(newCate));
        setCate({
          name: '',
          avt: '',
          status:'',
          // Thiết lập các giá trị khác cho cate ở đây.
        });
        setIsModalOpen(false);
        toast.success('Thêm Thành Công')
      };
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
      const handleOpenModal = () =>{
        setIsModalOpen(true);
      }
    return (

        <>
        <ToastContainer />
        <div style={{height:'50px', marginRight:'16px'}} className="flex justify-end h-screen">
        <button className='btn btn-outline' onClick={handleOpenModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </button>
      </div>
        <Modal className='custom-modal' isOpen={isModalOpen} onRequestClose={handleCloseModal}>
    
        
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        ADD CATEGORY
      </div>
    
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="input input-bordered p-2 mb-4 outline-none"
          spellCheck="false" name="name" value={cate.name} onChange={handleInputChange}
          placeholder="FULL NAME"
          type="text"
        />
        <select name="status"  value={cate.status} onChange={handleInputChange} className="select select-bordered p-2 mb-4">
          <option selected>Trạng Thái</option>
          <option >Ẩn</option>
          <option>Hiện</option>
          </select>
          <input
          className="input input-bordered p-2 mb-4 outline-none"
          spellCheck="false" name="avt" value={cate.avt} onChange={handleInputChange}
          placeholder="LINK AVARTAR"
          type="text"
        />
       
        <div className="buttons flex">
          <div onClick={handleCloseModal} className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <div onClick={handleAddCate} className="btn border border-indigo-500 p-1 px-4 btn-primary ml-2">
            ADD
          </div>
        </div>
      </div>
        </Modal>
        </>
  )
}
