// react imports
import { useState } from "react";

// css imports
import "./LoginModal.css";

// component imports
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// assets imports
import orSignUpImg from "../../assets/or Sign up.png";


function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  form,
  setForm,
}) {
  const [localError, setLocalError] = useState("");

  function validateEmailFormat(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const isEmailValid = validateEmailFormat(form.email);
  const isFormValid =
    isEmailValid && form.password && form.password.length >= 8;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, email: value });
    if (value && !validateEmailFormat(value)) {
      setLocalError("Invalid email address");
    } else {
      setLocalError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setLocalError("Please fill in all fields.");
      return;
    }
    if (!validateEmailFormat(form.email)) {
      setLocalError("Invalid email address");
      return;
    }
    setLocalError("");
    onLogin({ email: form.email, password: form.password });
    setForm({ email: "", password: "" });
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
          id="login-email"
          type="email"
          value={form.email}
          onChange={handleEmailChange}
          required
          autoComplete="username"
        />
        {localError && (
          <span className="modal__error-login-email">{localError}</span>
        )}
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          className="modal__input"
          id="login-password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="current-password"
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
