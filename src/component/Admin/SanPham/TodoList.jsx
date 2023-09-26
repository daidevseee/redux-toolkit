import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updateTodo, deleteTodo } from '../../../features/admin/adminSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import TodoForm from './TodoForm';
import ReactModal from 'react-modal';
import { Helmet } from 'react-helmet';
import { utils, writeFile } from 'xlsx';
const TodoList = ({ todos }) => {
  const dispatch = useDispatch();
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const cates = useSelector((state) => state.cates);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);
  const [currentCategory, setCurrentCategory] = useState(null);
  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };
  const filteredTodos = currentCategory ? todos.filter(todo => todo.category === currentCategory) : todos;
  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentFilteredTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  // Tính tổng số trang
  const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredTodos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <button className={`join-item btn ${number === currentPage ? 'btn-active' : ''}`}
        key={number}
        id={number}
        onClick={handlePageClick}
      >
        {number}
      </button>
    );
  });

  const handleDeleteTodo = (todo) => {
    setDeletingTodo(todo);
    setIsModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (deletingTodo) {
      dispatch(deleteTodo(deletingTodo.id));
      setDeletingTodo(null);
      setIsModalOpen(false);
      toast.success('Xóa thành công');
    }
  };
  
  

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTodo({
      ...editingTodo,
      [name]: value,
    });
  };
  
  const handleUpdateSubmit = () => {
    dispatch(updateTodo(editingTodo));
    setEditingTodo(null);
    setIsEditModalOpen(false); 
    toast.success('Sửa Thành Công')
  };
  
  const handleOpenDetailsModal = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpenDetail(true);
  };
  const handleCloseDetail =()=>{
    setIsModalOpenDetail(false);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  
  return (
    
    
    <>
    <Helmet>
      <title>Quản lí sản phẩm</title>
    </Helmet>
    <div className='more-option'>

    <button onClick={() => {
      const data = [
        ['Name', 'Số Lượng', 'Trạng Thái','Danh Mục', 'Mô Tả'],
        ...currentFilteredTodos.map(todo => [todo.name, todo.number, todo.status,todo.category, todo.description])
      ];
    const filename = 'Listproduct.xlsx';
    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, filename);
}} className="btn btn-primary excel">
  Export to Excel
</button>

    <select className='select select-bordered w-130 ' onChange={handleCategoryChange}>
      <option value="">All</option>
      {cates.map(category => (
        <option value={category.id} key={category.id}>{category.name}</option>
        ))}
        </select>
        <div className='todo-from'>
         <TodoForm/>
        </div>
    </div>
    <ToastContainer />
        <div  className="overflow-x-auto">
        {currentFilteredTodos.length === 0 ? (
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
              <th>Name</th>
              <th>Số Lượng</th>
              <th>Trạng Thái</th>
              <th>Mô Tả</th>
              <th>Option</th>
              
            </tr>
          </thead>
      {currentFilteredTodos.map((todo) => (
        <tbody key={todo.id}>
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
                      <img src={todo.avt} alt="Avatar" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{todo.name}</div>
                    <div className="text-sm opacity-50">
                    {cates.find((category) => category.id === todo.category)?.name}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {todo.number}
                <br/>
                <span className="badge badge-ghost badge-sm">Number technical</span>
              </td>
              <td>{todo.status}</td>
              <td>  <button  onClick={() => handleOpenDetailsModal(todo)} className="btn btn-link">
                chi tiết
              </button> </td>
              <th>
                <button  className='btn btn-ghost bnt-xs' onClick={() => handleEditTodo(todo)}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"/>
                </svg></button>
                <button  onClick={() => handleDeleteTodo(todo)} className="btn btn-ghost btn-xs"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
              </svg></button>
              </th>
              
              
            </tr>
          </tbody>
            ))}
          
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Số Lượng</th>
              <th>Trạng Thái</th>
              <th>Mô Tả</th>
              <th>Option</th>
              <th></th>
            </tr>
          </tfoot>
          
        </table>
      )}
      </div>     
      <div className='join ' id="page-numbers">
          {renderPageNumbers}
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        editingTodo={editingTodo}
        handleInputChange={handleInputChange}
        handleUpdateSubmit={handleUpdateSubmit}
        
      />
      <DeleteModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        deletingTodo={deletingTodo}
        handleConfirmDelete={handleConfirmDelete}
        handleCloseModal={handleCloseModal}
      />
      <ReactModal className='custom-modal'
        isOpen={isModalOpenDetail}
        onRequestClose={handleCloseDetail}

      >
        {selectedTodo && (
          <>
            <form method="dialog" className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Chi tiết {selectedTodo.name}</h3>
          <p className="py-4 text-align">{selectedTodo.description}</p>
          <div className="modal-action">
          <button onClick={handleCloseDetail} className="btn">Close</button>
    </div>
  </form>
          </>
        )}
      </ReactModal>
    </>
  );
};

export default TodoList;
