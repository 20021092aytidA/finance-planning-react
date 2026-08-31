import { API_URL_V1 } from "../apiDetails";

export type Plan = {
  id: number;
  userID: number;
  name: string;
  price: number;
  moneyAllocated: number;
};

type PlanGetResponse = {
  status: string | number;
  resMsg: string;
  data: Plan[] | null;
};

export const getPlan = async (userID: string): Promise<PlanGetResponse> => {
  const res = await fetch(`${API_URL_V1}/plans?userID=${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
      : "failed fetching plan!",
    data: null,
  };
};
