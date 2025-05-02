import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import constants from "@/lib/constants";

interface ApiResponse<T = any> {
  ok: boolean;
  data?: T | null;
  error?: any;
  headers?: Record<string, string>;
}

export const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: any,
  isFormData: boolean = false,
  onUploadProgress?: (progressEvent: import("axios").AxiosProgressEvent) => void
): Promise<ApiResponse<T>> => {
  try {
    // const token = localStorage.getItem(constants.TOKEN);
    const headers: Record<string, string> = {};

    // if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
    // }

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    headers["ngrok-skip-browser-warning"] = "69420";

    const config: AxiosRequestConfig = {
      method,
      url: `${constants.API_URL}${endpoint}`,
      headers,
      data: isFormData ? body : JSON.stringify(body),
      onUploadProgress,
    };

    const response: AxiosResponse = await axios(config);

    const contentType = response.headers["content-type"] || "";
    const isCSV = contentType.includes("text/csv");
    const data = isCSV ? response.data : response.data;

    // Custom pagination headers if needed
    const responseHeaders: Record<string, string> = {
      "total-pages": response.headers["total-pages"] || "1",
      "current-page": response.headers["current-page"] || "1",
    };

    return {
      ok: response.status >= 200 && response.status < 300,
      data,
      headers: responseHeaders,
    };
  } catch (error: any) {
    console.error("API Request Error:", error);

    return {
      ok: false,
      error: error.response?.data || "Network error occurred",
    };
  }
};
