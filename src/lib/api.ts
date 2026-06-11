 const BASE_URL = "https://q2cp7g9m-8080.inc1.devtunnels.ms/";

export const API_ENDPOINTS = {
  LOGIN: "login",
  ADD_CONTACT: "add-contact",
  CONTACT_LIST: "contact-list",
  ADD_WAREHOUSE: "add-warehouse",
  DASHBOARD: "dashboard",
  SIGNUP: "signup",
};

type ApiOptions = {
  endpoint: keyof typeof API_ENDPOINTS;
  data?: any;
  token?: string;
};

export async function apiRequest({
  endpoint,
  data = {},
  token,
}: ApiOptions) {
  try {
    const url = `${BASE_URL}${API_ENDPOINTS[endpoint]}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();

    const result = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}