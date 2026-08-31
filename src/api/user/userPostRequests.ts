import { API_URL_V1 } from "../apiDetails";

export type LoginForm = {
  email: string;
  password: string;
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
