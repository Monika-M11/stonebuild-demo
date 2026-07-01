



// const BASE_URL = "https://lf5jrmrz-8080.inc1.devtunnels.ms/";

// export const API_ENDPOINTS = {
//   LOGIN: "login",
//   REGISTER : "signup",
//   ADD_CONTACT: "new_contact",
//   CONTACT_LIST: "contacts_list",
//   GET_CONTACT_BY_ID: "get-contact-by-id",
//   UPDATE_CONTACT_STATUS: "update-contact-status",
//   ADD_WAREHOUSE: "add-warehouse",
//   DASHBOARD: "dashboard",
//   SIGNUP: "signup",
//   NEW_LEDGER: "new_ledger",
//   LEDGER_LIST:"ledgers_list",
//   NEW_MATERIAL : "new_material",
//   MATERIAL_LIST:"materials_list",
//   ADD_EQUIPMENT:"",
//   EQUIPMENT_LIST:"",
//   GET_WAREHOUSE_BY_ID:"",
//   WAREHOUSE_LIST:"",
//   PURCHASE_LIST:"",
//   ADD_PURCHASE:"",
//   ADD_EXPENSE:"",
//   EXPENSE_LIST:"",
//   ADD_QUOTATION:"",
//   QUOTATION_LIST:"",
//   LEAD_LIST:"",
//   ADD_LEAD:"",
//   ATTENDANCE_LIST:""
// } as const;

// export type EndpointKey = keyof typeof API_ENDPOINTS;

// export interface ApiResponse {
//   success?: boolean;   // ← add this
//   status?: string;
//   message?: string;
//   token?: string;
//   user?: any;
//   data?: any;
// }

// // Token helpers (unchanged)
// export const getToken = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token");
//   }
//   return null;
// };

// export const setSession = (token: string, user: any) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(user));
// };

// export const clearSession = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
// };

// export const getSession = () => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     const userStr = localStorage.getItem("user");
//     return {
//       token,
//       user: userStr ? JSON.parse(userStr) : null,
//     };
//   }
//   return { token: null, user: null };
// };

// // POST API with Detailed Logging
// export const postAPI = async (
//   endpoint: EndpointKey,
//   body: any = {},
//   isAuthRequired: boolean = false
// ): Promise<ApiResponse> => {
//   const fullUrl = `${BASE_URL}${API_ENDPOINTS[endpoint]}`;

//   // 🔥 DEBUG LOGS
//   console.group(`🌐 API Request: ${endpoint}`);
//   console.log("Full URL:", fullUrl);
//   console.log("Payload:", JSON.stringify(body, null, 2));
//   console.log("Auth Required:", isAuthRequired);
//   if (isAuthRequired) {
//     console.log("Token Present:", !!getToken());
//   }
//   console.groupEnd();

//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//   };

//   if (isAuthRequired) {
//     const token = getToken();
//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     } else {
//       console.warn(` Auth required for ${endpoint} but no token found`);
//     }
//   }

//   try {
//     const res = await fetch(fullUrl, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(body),
//     });

//     const data: ApiResponse = await res.json().catch(() => ({}));

//     // Log Response
//     console.group(` API Response: ${endpoint}`);
//     console.log("Status:", res.status);
//     console.log("Response Body:", data);
//     console.groupEnd();

//     if (!res.ok) {
//       throw new Error(data.message || `HTTP Error ${res.status}`);
//     }

//     return data;
//   } catch (error: any) {
//     console.error(`❌ API Error [${endpoint}]:`, error.message);
//     throw error;
//   }
// };



const BASE_URL = "https://lf5jrmrz-8080.inc1.devtunnels.ms/";

export const API_ENDPOINTS = {
  LOGIN: "login",
  REGISTER: "signup",
  ADD_CONTACT: "new_contact",
  CONTACT_LIST: "contacts_list",
  GET_CONTACT_BY_ID: "get-contact-by-id",
  UPDATE_CONTACT_STATUS: "update-contact-status",
  CONTACT_FILTER : "contact_filter",
  ADD_WAREHOUSE: "add-warehouse",
  DASHBOARD: "dashboard",
  SIGNUP: "signup",
  NEW_LEDGER: "new_ledger",
  LEDGER_LIST: "ledgers_list",
  NEW_MATERIAL: "new_material",
  MATERIAL_LIST: "materials_list",
  ADD_EQUIPMENT: "",
  EQUIPMENT_LIST: "",
  GET_EQUIPMENT_BY_ID : "",
  GET_WAREHOUSE_BY_ID: "",
  WAREHOUSE_LIST: "",
  PURCHASE_LIST: "",
  ADD_PURCHASE: "",
  ADD_EXPENSE: "",
  EXPENSE_LIST: "",
  ADD_QUOTATION: "",
  QUOTATION_LIST: "",
  LEAD_LIST: "",
  ADD_LEAD: "",
  ATTENDANCE_LIST: ""
} as const;

export type EndpointKey = keyof typeof API_ENDPOINTS;


export interface ApiResponse {
  success?: boolean;
  status?: boolean | string;
  message?: string;
  token?: string;
  user?: any;
  data?: any;
  count?: number;        
  limit?: number;       
  page_no?: number;      
  totalPages?: number;  
}

// ==================== SESSION MANAGEMENT ====================

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getCompanyId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("company_id");
  }
  return null;
};

export const setSession = (token: string, companyId: string, userData?: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("company_id", companyId);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }
};

export const clearSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("company_id");
    localStorage.removeItem("user");
  }
};

export const getSession = () => {
  if (typeof window !== "undefined") {
    return {
      token: localStorage.getItem("token"),
      company_id: localStorage.getItem("company_id"),
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    };
  }
  return { token: null, company_id: null, user: null };
};

// ==================== POST API ====================

export const postAPI = async (
  endpoint: EndpointKey,
  body: any = {},
  isAuthRequired: boolean = false
): Promise<ApiResponse> => {
  const fullUrl = `${BASE_URL}${API_ENDPOINTS[endpoint]}`;

  // Add company_id to every request if available


  const companyId = getCompanyId();

const shouldAttachCompanyId =
  isAuthRequired &&
  companyId &&
  endpoint !== "REGISTER" &&
  endpoint !== "LOGIN";

  const finalBody = companyId 
    ? { ...body, company_id: companyId } 
    : body;

  // 🔥 DEBUG LOGS
  console.group(`🌐 API Request: ${endpoint}`);
  console.log("Full URL:", fullUrl);
  console.log("Payload:", JSON.stringify(finalBody, null, 2));
  console.log("Auth Required:", isAuthRequired);
  if (isAuthRequired) {
    console.log("Token Present:", !!getToken());
    console.log("Company ID:", companyId);
  }
  console.groupEnd();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (isAuthRequired) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn(`Auth required for ${endpoint} but no token found`);
    }
  }

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(finalBody),
    });

    const data: ApiResponse = await res.json().catch(() => ({}));

    // Log Response
    console.group(`📥 API Response: ${endpoint}`);
    console.log("Status:", res.status);
    console.log("Response Body:", data);
    console.groupEnd();

    if (!res.ok) {
      throw new Error(data.message || `HTTP Error ${res.status}`);
    }

    return data;
  } catch (error: any) {
    console.error(`❌ API Error [${endpoint}]:`, error.message);
    throw error;
  }
};