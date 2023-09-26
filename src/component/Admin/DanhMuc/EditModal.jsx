import React from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, editingCate, handleInputChange, handleUpdateSubmit }) => {
  const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);
 const handleChange = (event) => {
    handleInputChange(event); 
  };

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
      spellCheck="false" name="name" value={editingCate?.name || ''} onChange={handleInputChange}
      placeholder="Name Category"
      type="text"
    />
    <select name="status" value={editingCate?.status || ''} onChange={handleInputChange} className="select select-bordered p-2 mb-4">
      <option selected>Trạng Thái</option>
      <option >Ẩn</option>
      <option>Hiện</option>
      </select>
      <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="avt" value={editingCate?.avt || ''} onChange={handleInputChange}
      placeholder="LINK AVARTAR"
      type="text"
    />
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
