import { API_URL_V1 } from "../apiDetails";

export type Sub = {
  id: number;
  userID: number;
  name: string;
  interval: number;
  price: number;
  startDate: string;
};

type SubGetResponse = {
  status: string | number;
  resMsg: string;
  data: Sub[] | null;
};

export const getSubscriptions = async (
  userID: string,
): Promise<SubGetResponse> => {
  const res = await fetch(`${API_URL_V1}/subscriptions?userID=${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const resJSON: any = await res.json().catch(() => null);

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
      : "failed getting subscriptions",
    data: null,
  };
};
