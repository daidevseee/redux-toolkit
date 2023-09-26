import React from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, editingInfo, handleInputChange, handleUpdateSubmit }) => {
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
      spellCheck="false" name="name_web" value={editingInfo?.name_web || ''} onChange={handleInputChange}
      placeholder="Name Website"
      type="text"
    />
    <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="dev" value={editingInfo?.dev || ''} onChange={handleInputChange}
      placeholder="Developer"
      type="text"
    />
    <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="slogan" value={editingInfo?.slogan || ''} onChange={handleInputChange}
      placeholder="Developer"
      type="text"
    />
    {/* <select name="status" value={editingCate?.status || ''} onChange={handleInputChange} className="select select-bordered p-2 mb-4">
      <option selected>Trạng Thái</option>
      <option >Ẩn</option>
      <option>Hiện</option>
      </select> */}
      <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="url" value={editingInfo?.url || ''} onChange={handleInputChange}
      placeholder="URL Website"
      type="url"
    />
      <input
      className="input input-bordered p-2 mb-4 outline-none"
      spellCheck="false" name="footer_copyright" value={editingInfo?.footer_copyright || ''} onChange={handleInputChange}
      placeholder="Footer - Copyright"
      type="url"
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
