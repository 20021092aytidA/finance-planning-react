import { API_URL } from "../apiDetails";
import { LoginFormType } from "../../components/login/LoginPage";

type LoginResponse = {
  status: string | number;
  resMsg: string;
  id?: string | number;
  token?: string;
};

export const loginUser = async (
  loginForm: LoginFormType,
): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/users/login`, {
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
