// css imports
import "./ModalWithForm.css";

// assets imports
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
      <div className={`modal ${isOpen ? " modal__opened" : ""}`}>
        <button
            onClick={onClose}
            type="button"
            className="modal__close-btn"
            title="Close"
          >
            <img src={closeIcon} className="modal__close-icon" alt="Close" />
          </button>
        <div className="modal__content">
          <h2 className="modal__title">{titleText}</h2>
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
