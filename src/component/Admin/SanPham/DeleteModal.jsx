// DeleteModal.js
import React from 'react';
import Modal from 'react-modal';

const DeleteModal = ({ isOpen, onRequestClose, deletingTodo, handleConfirmDelete,handleCloseModal  }) => {
  return (
    

    <Modal className='custom-modal' isOpen={isOpen} onRequestClose={onRequestClose}>
  <div className="alert">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>{deletingTodo && (
      <>
        <span>Bạn Chắc Chắn Muốn Xóa</span>
        <p style={{fontSize:'20px', fontWeight:'bold'}}>'{deletingTodo.name}'</p>
      </>
    )}</span>
  <div>
    <button onClick={handleCloseModal}  className="btn btn-sm">Cancel</button>
    <button onClick={handleConfirmDelete} className="btn btn-sm btn-primary">Delete</button>
  </div>
</div>
    </Modal>
   
  );
};

export default DeleteModal;
