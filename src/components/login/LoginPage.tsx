import React, { useState } from "react";
import { LoginForm, loginUser } from "../../api/user/userPostRequests";
import { useNavigate } from "react-router-dom";

export default function LoginPage(): React.ReactNode {
  type LoginErrorMessage = {
    email: string | null;
    password: string | null;
  };

  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<LoginErrorMessage>({
    email: null,
    password: null,
  });
  const [btnDisable, setBtnDisable] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateLogin = (): boolean => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    return isEmailValid && isPasswordValid;
  };

  const validateEmail = (): boolean => {
    //empty
    if (loginForm.email.trim() === "") {
      setErrorMsg((prev) => ({ ...prev, email: "email must be filled!" }));
      return false;
    } else {
      setErrorMsg((prev) => ({ ...prev, email: null }));
    }

    //isEmail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(loginForm.email)) {
      setErrorMsg((prev) => ({ ...prev, email: "email is not valid!" }));
      return false;
    } else {
      setErrorMsg((prev) => ({ ...prev, email: null }));
    }

    return true;
  };

  const validatePassword = (): boolean => {
    //empty
    if (loginForm.password.trim() === "") {
      setErrorMsg((prev) => ({
        ...prev,
        password: "password must be filled!",
      }));
      return false;
    } else {
      setErrorMsg((prev) => ({
        ...prev,
        password: null,
      }));
    }

    return true;
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (validateLogin()) {
      setBtnDisable(true);
      try {
        const res = await loginUser(loginForm);
        if (res.status == 200) {
          alert(`login succeed: user id ${res?.id}`);
          sessionStorage.setItem("userID", res?.id?.toString() ?? "null");
          navigate("/dashboard", { replace: true });
        } else {
          alert(`login failed: ${res.resMsg}`);
        }
      } catch (error) {
        alert(`login failed: ${error}`);
      } finally {
        setBtnDisable(false);
      }
    }
  };

  return (
    <div className="bg-gray-700 h-screen flex justify-center items-center">
      <div className="p-2 rounded-sm bg-gray-100 w-100 flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
          className="outline-1 rounded-sm p-1"
        />
        {errorMsg.email ? (
          <div className="text-sm text-red-700 font-semibold">
            {errorMsg.email}
          </div>
        ) : null}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          className="outline-1 rounded-sm p-1"
        />
        {errorMsg.password ? (
          <div className="text-sm text-red-700 font-semibold">
            {errorMsg.password}
          </div>
        ) : null}
        <button
          className="cursor-pointer hover:underline"
          onClick={handleLogin}
          disabled={btnDisable}
        >
          Login
        </button>
      </div>
    </div>
  );
}
