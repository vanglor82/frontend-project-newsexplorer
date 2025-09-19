import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import orSignUpImg from "../../assets/or Sign up.png";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email && password && password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onLogin({ email, password });
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      titleText="Sign in"
      footer={
        <div className="modal__footer">
          <button
            className="modal__footer-switch"
            type="button"
            onClick={onSwitchToRegister}
          >
            <img
              src={orSignUpImg}
              alt="or Sign up"
              className="modal__footer-img"
            />
          </button>
        </div>
      }
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          id="login-email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="login-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button
        className="modal__button"
        type="submit"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Sign in
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
