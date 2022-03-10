import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import './ErrorModal.css'


function ErrorModal({ children, setErr }) {
  const handleClick = () => {
    setErr(() => null);
  };

  return (
      <>
      <div className="modal__overlay"></div>
      <div className="modal__container">
      <button onClick={handleClick} className='modal__container-close-btn'>
        <AiOutlineClose />
      </button>
      <span className="modal__container-text">{children}</span>
    </div>
      </>
    
  );
}

export default ErrorModal;
