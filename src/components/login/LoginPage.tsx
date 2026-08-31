import React, { useState } from "react";
import { loginUser } from "../../api/user/userRequests";
import { redirect, useNavigate } from "react-router-dom";

export type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginPage(): React.ReactNode {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [btnDisable, setBtnDisable] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
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
  };

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleLogin} disabled={btnDisable}>
        Login
      </button>
    </div>
  );
}
