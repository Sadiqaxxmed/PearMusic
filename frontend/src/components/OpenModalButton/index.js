import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      {/* <button onClick={onClick}>{buttonText}</button> */}
      <div className='Menu-LogIn-Btn' onClick={onClick}>&nbsp;&nbsp;{buttonText}</div>
      {/* <i class="fa-solid fa-right-to-bracket" id='Login-Icon'></i> */}
    </>
  );
}

export default OpenModalButton;
