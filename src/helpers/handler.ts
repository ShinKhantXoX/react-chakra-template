import { HTTPErrorResponse, HTTPResponse, keys } from "../constants/config";
import { toaster } from "@/components/ui/toaster";
import { checkRefreshToken, updateError } from "../shares/shareSlice";
import { removeData } from "./localStorage";
import { Dispatch } from "redux";

/** Success envelope from axios + httpResponseHandler */
export function isHttpResponse(r: unknown): r is HTTPResponse {
  return (
    typeof r === "object" &&
    r !== null &&
    "statusText" in r &&
    "data" in r &&
    typeof (r as HTTPResponse).status === "number"
  );
}

/**
 * Runs httpServiceHandler with the correct slice of the request result.
 * Call from get/post/put/del helpers so errors (full HTTPErrorResponse) reach the handler with message/notification.
 */
export async function applyHttpServiceHandler(
  dispatch: Dispatch,
  response: HTTPResponse | HTTPErrorResponse | undefined,
): Promise<void> {
  if (response === undefined) {
    return;
  }
  if (isHttpResponse(response)) {
    await httpServiceHandler(dispatch, response.data);
  } else {
    await httpServiceHandler(dispatch, response);
  }
}

/**
 * Payload handler for update state
 * @param {*} payload
 * @param {*} value
 * @param {*} field
 * @param {*} fn
 */
export const payloadHandler = (
  payload: any,
  value: string | number,
  field: string,
  fn: (updatedPayload: any) => void,
) => {
  let updatePayload = { ...payload };
  updatePayload[field] = value;
  fn(updatePayload);
};

/**
 * Http error handler for api call
 * @param {*} error
 * @returns
 */
export const httpErrorHandler1 = (error: any) => {
  if (error.code === "ERR_NETWORK") {
    const response = {
      message: error.message,
      status: 0,
      notification: {
        show: true,
        msg: "Network Error!",
        variant: "error",
      },
    };

    return response;
  }

  const { status, data } = error.response;

  if (
    status === 400 ||
    status === 404 ||
    status === 500 ||
    status === 403 ||
    status === 405
  ) {
    return {
      status: status,
      message: error.message,
      notification: {
        show: true,
        variant: "warning",
        msg: error.message,
      },
    };
  }

  if (status === 422) {
    return { status: status, error: data.data };
  }

  if (status === 401) {
    removeData(keys.API_TOKEN);
    window.location.reload();
    return {
      status: status,
      error: data.message,
    };
  }
};
/**
 * Http error handler for api call
 * @param {*} error
 * @returns
 */
export const httpErrorHandler = async (
  error: any,
  dispatch: Dispatch,
): Promise<HTTPErrorResponse> => {
  if (error.code === "ERR_NETWORK") {
    return {
      message: "Network Error!", // Ensure message is set
      status: 0,
      notification: {
        show: true,
        msg: "Network Error!",
        variant: "error",
      },
    };
  }

  const { status, data } = error.response;

  if ([400, 404, 500, 403, 405].includes(status)) {
    return {
      status: status,
      message: error.message || "An error occurred", // Ensure message is set
      notification: {
        show: true,
        variant: "warning",
        msg: error.message,
      },
    };
  }

  if (status === 422) {
    return {
      status: status,
      message: data.message ? data.message : "Validation error", // Add message for 422 status
      error: data.data,
    };
  }

  if (status === 401) {
    // removeData(keys.API_TOKEN);
    // window.location.reload();
    console.log("Unauthorized access");
    dispatch(checkRefreshToken(true));
    // authService.refreshToken();
    // return {
    //   status: status,
    //   message: "Unauthorized access",  // Add message for 401 status
    //   error: data.message,
    // };
  }

  return {
    status: status,
    message: "Unknown error", // Fallback for unknown cases
    notification: {
      show: true,
      msg: "An unexpected error occurred.",
      variant: "error",
    },
  };
};

/**
 * Http response handler for api call
 * @param {*} result
 * @returns
 */
export const httpResponseHandler = (result: any) => {
  console.log(result);

  const response: HTTPResponse = {
    status: result.status,
    statusText: result.statusText,
    data: result.data.data,
  };

  return response;
};

export type HttpServiceHandlerPayload = {
  status: number;
  error?: unknown;
  message?: string;
  notification?: HTTPErrorResponse["notification"];
};

function defaultToastDescription(status: number): string {
  switch (status) {
    case 0:
      return "Network error. Check your connection.";
    case 404:
      return "Resource not found.";
    case 403:
      return "You do not have permission for this action.";
    case 405:
      return "Method not allowed.";
    default:
      return "Request failed. Please try again.";
  }
}

function toastTypeForStatus(
  status: number,
  variant?: string,
): "error" | "warning" | "info" {
  if (variant === "warning") return "warning";
  if (variant === "error") return "error";
  if (status >= 500 || status === 0) return "error";
  return "warning";
}

/**
 * Http status handler from service (and central API helpers).
 */
export const httpServiceHandler = async (
  dispatch: Dispatch,
  result: HttpServiceHandlerPayload | unknown,
) => {
  if (result === null || result === undefined || typeof result !== "object") {
    return;
  }

  const r = result as HttpServiceHandlerPayload;
  if (typeof r.status !== "number") {
    await dispatch(updateError(null));
    return;
  }

  await dispatch(updateError(null));
  if (
    r.status === 400 ||
    r.status === 0 ||
    r.status === 500 ||
    r.status === 404 ||
    r.status === 403 ||
    r.status === 405
  ) {
    const description =
      (typeof r.message === "string" && r.message) ||
      r.notification?.msg ||
      defaultToastDescription(r.status);
    const toastType = toastTypeForStatus(r.status, r.notification?.variant);
    const title = toastType === "warning" ? "Warning" : "Error";
    toaster.create({
      title,
      description,
      type: toastType,
      duration: 3000,
    });
  }

  if (r.status === 422) {
    await dispatch(updateError(r.error));
  }

  if (r.status === 204) {
    return null;
  }

  return;
};
