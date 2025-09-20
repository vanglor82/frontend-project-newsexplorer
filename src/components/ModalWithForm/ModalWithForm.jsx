import React, { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/Close.png";

function ModalWithForm({
  isOpen,
  onClose,
  children,
  titleText,
  onSubmit,
  footer,
}) {
  return (
    <>
      <div
        className={`modal__backdrop${
          isOpen ? " modal__backdrop--visible" : ""
        }`}
      />
      <div className={`modal${isOpen ? " modal__opened" : ""}`}>
        <div className="modal__content">
          <h2 className="modal__title">{titleText}</h2>
          <button
            onClick={onClose}
            type="button"
            className="modal__close-btn"
            title="Close"
          >
            <img src={closeIcon} alt="Close" />
          </button>
          <form onSubmit={onSubmit} className="modal__form">
            {children}
          </form>
          {footer}
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
