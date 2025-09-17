import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import orSignInImg from "../../assets/or Sign in.png";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isFormValid = email && password && name;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onRegister({ email, password, name });
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      titleText="Sign up"
      footer={
        <div className="modal__footer">
          <button
            className="modal__footer-switch"
            type="button"
            onClick={onSwitchToLogin}
          >
            <img
              src={orSignInImg}
              alt="or Sign in"
              className="modal__footer-img"
            />
          </button>
        </div>
      }
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="register-email"
          placeholder="Enter email"
          minLength="2"
          maxLength="40"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="register-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      </label>
      <label htmlFor="register-username" className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          id="register-username"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button
        className="modal__button"
        type="submit"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Sign up
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
