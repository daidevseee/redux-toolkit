import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
const EditModal = ({ isOpen, onRequestClose, editingTodo, handleInputChange, handleUpdateSubmit }) => {
  const cates = useSelector((state) => state.cates);

  const handleCloseModal = () => {
    onRequestClose(); 
  };

  const handleUpdate = () => {
    handleUpdateSubmit(); 
  };
  return(
    <>
  <Modal className='custom-modal' isOpen={isOpen} onRequestClose={onRequestClose}>


    <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
    Update
  </div>

  <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="name" value={editingTodo?.name || ''} onChange={handleInputChange}
      placeholder="Tên Sản Phẩm"
      type="text"
    />
    <select name="status" value={editingTodo?.status || ''} onChange={handleInputChange} className="select select-bordered p-2 mb-4">
      <option selected>Trạng thái</option>
      <option >Ẩn</option>
      <option>Hiện</option>
      </select>
      <select
            name="category"
            value={editingTodo?.category || ''}
            onChange={handleInputChange}
            className="select select-bordered p-2 mb-4"
          >
            <option value="">Chọn danh mục</option>
            {cates.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
      <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="avt" value={editingTodo?.avt || ''} onChange={handleInputChange}
      placeholder="LINK ảnh sp"
      type="text"
    />
      <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="number" value={editingTodo?.number || ''} onChange={handleInputChange}
      placeholder="Số Lượng"
      type="number"
    />
        <textarea name="description" value={editingTodo?.description || ''} onChange={handleInputChange} className="textarea textarea-bordered textarea-ghost" placeholder="Mô tả"></textarea>
    <div className="buttons flex">
      <div onClick={handleCloseModal} className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
        Cancel
      </div>
      <div onClick={handleUpdate} className="btn border border-indigo-500 p-1 px-4 btn-primary ml-2">
        Update
      </div>
    </div>
  </div>
  </Modal>
    </>
  )
};

export default EditModal;
