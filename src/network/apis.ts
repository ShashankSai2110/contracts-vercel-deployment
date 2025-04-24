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
  isFormData: boolean = false
): Promise<ApiResponse<T>> => {
  try {
    //const token = localStorage.getItem(constants.TOKEN);
    const headers: HeadersInit = {};

    // if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
    // }

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body) {
      if (isFormData) {
        requestOptions.body = body;
      } else {
        requestOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(
      `${constants.API_URL}${endpoint}`,
      requestOptions
    );
    const contentType = response.headers.get("Content-Type") || "";
    const isCSV = contentType.includes("text/csv");
    // Log the raw response
    console.log("API Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (response.status === 204) {
      return {
        ok: true,
        data: null,
        headers: {},
      };
    }

    const data = isCSV ? await response.text() : await response.json();

    // Get pagination headers
    const responseHeaders: Record<string, string> = {};
    responseHeaders["total-pages"] = response.headers.get("total-pages") || "1";
    responseHeaders["current-page"] =
      response.headers.get("current-page") || "1";

    return {
      ok: response.ok,
      data: response.ok ? data : undefined,
      error: !response.ok ? data : undefined,
      headers: responseHeaders,
    };
  } catch (error) {
    console.error("API Request Error:", error);
    return {
      ok: false,
      error: "Network error occurred",
    };
  }
};
