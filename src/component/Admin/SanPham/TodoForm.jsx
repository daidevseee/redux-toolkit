import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../../features/admin/adminSlice';
import { fetchCategories } from '../../../features/admin/cateSlide';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TodoForm = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cates = useSelector((state) => state.cates);
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);
  };

  const [todo, setTodo] = useState({
      name: '',
      // nation: '',
      description:'',
      avt: '',
      number:'',
      category:'',
      status:'',
    // Thêm các trường khác của todo tại đây (ví dụ: priority, assignee, ...).
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleAddTodo = () => {
    // Kiểm tra nếu tiêu đề rỗng hoặc chỉ chứa khoảng trắng
    if (todo.name.trim() === '') {
      return;
    }

    const newTodo = {
      ...todo,
      name: todo.name.trim(),
      category: selectedCategory,
      completed: false,
    };
    dispatch(addTodo(newTodo));
    setTodo({
      name: '',
      description: '',
      avt: '',
      category:'',
      number:'',
      status:'',
      // Thiết lập các giá trị khác cho todo ở đây.
    });
    setIsModalOpen(false);
    setSelectedCategory('');
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
    ADD
  </div>

  <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="name" value={todo.name} onChange={handleInputChange}
      placeholder="Tên Sản Phẩm"
      type="text"
    />
      <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="avt" value={todo.avt} onChange={handleInputChange}
      placeholder="LINK hình ảnh sp"
      type="text"
    />
      <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="number" value={todo.number} onChange={handleInputChange}
      placeholder="Số lượng"
      type="number" min={'0 '}
    />
    <select name="status" value={todo.status} onChange={handleInputChange} className="select select-bordered p-2 mb-4">
      <option selected>Trạng Thái</option>
      <option >Ẩn</option>
      <option>Hiện</option>
      </select>
     
<select className='select select-bordered p-2 mb-4' onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {cates.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name} | {category.status}
          </option>
        ))}
      </select>
<textarea name="description" value={todo.description} onChange={handleInputChange} className="textarea textarea-bordered textarea-ghost" placeholder="Mô tả"></textarea>
      
    <div className="buttons flex">
      <div onClick={handleCloseModal} className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
        Cancel
      </div>
      <div onClick={handleAddTodo} className="btn border border-indigo-500 p-1 px-4 btn-primary ml-2">
        ADD
      </div>
    </div>
  </div>
    </Modal>
    </>
  );
};

export default TodoForm;
