// react imports
import { useState } from "react";

// css imports
import "./RegisterModal.css";

// component imports
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// assets imports
import orSignInImg from "../../assets/or Sign in.svg";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitchToLogin,
  form,
  setForm,
}) {
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const isFormValid = form.email && form.password && form.name;

  // Simulate unavailable email error (replace with actual API error handling in the future)
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    if (form.email === "example@test.com") {
      setEmailError("This email is not available");
      hasError = true;
    } else {
      setEmailError("");
    }
    if (form.name === "username") {
      setUsernameError("This username is not available");
      hasError = true;
    } else {
      setUsernameError("");
    }
    if (hasError) return;
    if (isFormValid) {
      onRegister({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      setForm({ email: "", password: "", name: "" });
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
          className={`modal__input${emailError ? " modal__input_error" : ""}`}
          type="email"
          id="register-email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          autoComplete="username"
        />
        {emailError && <span className="modal__error">{emailError}</span>}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="register-password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          id="register-name"
          placeholder="Enter username"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          autoComplete="name"
        />
        {usernameError && <span className="modal__error">{usernameError}</span>}
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
