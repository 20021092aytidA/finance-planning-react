import { Register } from "react-router-dom";
import { API_URL_V1 } from "../apiDetails";

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

type User = {
  id: number;
  email: string;
  username: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

type CreateUserResponse = {
  status: string | number;
  resMsg: string;
  data: User | null;
};

type LoginResponse = {
  status: string | number;
  resMsg: string;
  id?: string | number;
  token?: string;
};

type LogOutResponse = {
  status: string | number;
  resMsg: string;
};

export const createUser = async (
  form: RegisterForm,
): Promise<CreateUserResponse> => {
  const res = await fetch(`${API_URL_V1}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const resJSON = await res.json().catch(() => null);

  if (res.ok) {
    return {
      status: resJSON.status,
      resMsg: resJSON.message,
      data: resJSON.data,
    };
  }

  return {
    status: resJSON ? resJSON.status : res.status,
    resMsg: resJSON
      ? `${resJSON.message} - ${resJSON.description}`
      : "failed registering user!",
    data: null,
  };
};

export const loginUser = async (
  loginForm: LoginForm,
): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL_V1}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginForm),
    credentials: "include",
  });
  const resJson: any = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      status: resJson?.status ?? res.status,
      resMsg: resJson
        ? `${resJson.message} - ${resJson.description}`
        : "login failed!",
    };
  }

  return {
    status: resJson.status,
    resMsg: resJson.message,
    id: resJson.id,
    token: resJson.token,
  };
};

export const logOutUser = async (id: string): Promise<LogOutResponse> => {
  const res = await fetch(`${API_URL_V1}/users/log-out/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const resJSON: any = await res.json().catch(() => null);

  if (!res.ok) {
    if (resJSON !== null) {
      return {
        status: resJSON.status,
        resMsg: `${resJSON.message} - ${resJSON.description}`,
      };
    }

    return {
      status: res.status,
      resMsg: `log out failed`,
    };
  }

  return {
    status: resJSON.status,
    resMsg: resJSON.message,
  };
};
