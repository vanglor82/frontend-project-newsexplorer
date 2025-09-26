import React from "react";
import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onSignIn }) {
  if (!isOpen) return null;
  return (
    <div className="modal__overlay">
      <div className="modal modal__success">
        <button
          className="modal__close-btn"
          onClick={onClose}
        />
        <h2 className="modal__success-title">
          Registration successfully completed!
        </h2>
        <button
          className="modal__success-signin"
          onClick={onSignIn}
          type="button"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
