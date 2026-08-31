import React, { ChangeEvent, useState } from "react";
import { createUser, RegisterForm } from "../../api/user/userPostRequests";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(): React.ReactNode {
  type RegisterErrorMessage = {
    email: string | null;
    username: string | null;
    password: string | null;
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
    username: "",
  });
  const [errorMsg, setErrorMsg] = useState<RegisterErrorMessage>({
    email: null,
    password: null,
    username: null,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = (): boolean => {
    const isEmailValid = validateEmail();
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();

    return isEmailValid && isUsernameValid && isPasswordValid;
  };

  const validateEmail = (): boolean => {
    //empty
    if (registerForm.email.trim() === "") {
      setErrorMsg((prev) => ({ ...prev, email: "email must be filled!" }));
      return false;
    } else {
      setErrorMsg((prev) => ({ ...prev, email: null }));
    }

    //isEmail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(registerForm.email)) {
      setErrorMsg((prev) => ({ ...prev, email: "email is not valid!" }));
      return false;
    } else {
      setErrorMsg((prev) => ({ ...prev, email: null }));
    }

    return true;
  };

  const validateUsername = (): boolean => {
    // empty
    if (registerForm.username.trim() === "") {
      setErrorMsg((prev) => ({
        ...prev,
        username: "username must be filled!",
      }));
      return false;
    } else {
      setErrorMsg((prev) => ({ ...prev, username: null }));
    }

    return true;
  };

  const validatePassword = (): boolean => {
    // empty
    if (registerForm.password.trim() === "") {
      setErrorMsg((prev) => ({
        ...prev,
        password: "password must be filled!",
      }));
      return false;
    } else {
      setErrorMsg((prev) => ({ ...prev, password: null }));
    }

    return true;
  };

  const handleRegister = async (): Promise<void> => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await createUser(registerForm);
        if (res.status == 201) {
          navigate("/login");
          return;
        }

        alert("failed registering user, " + res.resMsg);
      } catch (error) {
        alert("failed registering user, " + error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={registerForm.email}
          onChange={handleFormChange}
        />
        {errorMsg.email ?? (
          <div className="text-sm text-red-700 font-semibold">
            {errorMsg.email}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={registerForm.username}
          onChange={handleFormChange}
        />
        {errorMsg.username ?? (
          <div className="text-sm text-red-700 font-semibold">
            {errorMsg.username}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={registerForm.password}
          onChange={handleFormChange}
        />
        {errorMsg.password ?? (
          <div className="text-sm text-red-700 font-semibold">
            {errorMsg.password}
          </div>
        )}
      </div>
      <button disabled={isLoading} onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
