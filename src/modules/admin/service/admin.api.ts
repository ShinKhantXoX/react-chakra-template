import { endpoints } from "@/constants/endpoints";
import { getRequest, postRequest, putRequest } from "@/helpers/api";
import type { AdminFormInputs } from "@/modules/admin/admin.payload";
import { index, show, update } from "@/modules/admin/admin.slice";
import type { AppDispatch } from "@/stores";

export type AdminStatusType = "user" | "user_type";

export async function fetchAdminStatusByType(
  dispatch: AppDispatch,
  type: AdminStatusType,
): Promise<string[]> {
  const response: any = await getRequest(
    `${endpoints.status}?type=${type}`,
    null,
    dispatch,
  );
  if (!response || response.status !== 200) {
    return [];
  }
  const key = type === "user" ? "user" : "user_type";
  return response.data[key] ?? [];
}

export async function fetchAdminIndex(dispatch: AppDispatch, params: unknown) {
  const response: any = await getRequest(endpoints.admin, params, dispatch);
  if (response.status === 200) {
    dispatch(index(response.data));
  }
  return response.data;
}

export async function createAdmin(dispatch: AppDispatch, payload: unknown) {
  const response: any = await postRequest(
    endpoints.adminCreate,
    payload,
    dispatch,
  );
  return response.data;
}

export async function updateAdmin(
  dispatch: AppDispatch,
  args: {
    id: number;
    payload: AdminFormInputs;
    notifications?: {
      show: (
        message: string,
        options: { severity: string; autoHideDuration: number },
      ) => void;
    };
  },
) {
  const { id, payload, notifications } = args;
  const response: any = await putRequest(
    `${endpoints.admin}/${id}`,
    payload,
    dispatch,
  );

  if (response.data.statusCode === 200) {
    notifications?.show("Admin is updated successfully", {
      severity: "success",
      autoHideDuration: 3000,
    });
    dispatch(update(response.data));
  }
  return response.data;
}

export async function patchAdminColumn(
  dispatch: AppDispatch,
  args: { id: number; payload: Record<string, unknown>; column?: string },
) {
  const { id, payload } = args;
  const response: any = await postRequest(
    `${endpoints.admin}/${id}`,
    payload,
    dispatch,
  );

  if (response.status === 200) {
    dispatch(update(response.data));
  }
  return response;
}

export async function fetchAdminShow(dispatch: AppDispatch, id: number) {
  const response: any = await getRequest(
    `${endpoints.admin}/${id}`,
    null,
    dispatch,
  );
  if (response.data.statusCode === 200) {
    dispatch(show(response.data.payload));
  }
  return response.data;
}
