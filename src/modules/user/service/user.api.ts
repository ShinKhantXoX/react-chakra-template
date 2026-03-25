import { endpoints } from "@/constants/endpoints";
import { getRequest, postRequest, putRequest } from "@/helpers/api";
import type {
  UserFormInputs,
  USER,
  UserIndexPayload,
} from "@/modules/user/user.payload";
import { index, show, update } from "@/modules/user/user.slice";
import type { AppDispatch } from "@/stores";

export type UserStatusType = "user" | "user_type";

function normalizeUserIndexPayload(raw: unknown): UserIndexPayload {
  if (Array.isArray(raw)) {
    const rows = raw as USER[];
    const n = rows.length;
    return {
      data: rows,
      current_page: 1,
      last_page: 1,
      per_page: n > 0 ? n : 1,
      total: n,
    };
  }
  const o = raw as Record<string, unknown>;
  const rows = (Array.isArray(o.data) ? o.data : []) as USER[];
  return {
    data: rows,
    current_page: Number(o.current_page) || 1,
    last_page: Number(o.last_page) || 1,
    per_page: Number(o.per_page) || rows.length || 10,
    total: Number(o.total) || rows.length,
  };
}

export async function fetchUserStatusByType(
  dispatch: AppDispatch,
  type: UserStatusType,
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

export async function fetchUserIndex(dispatch: AppDispatch, params: unknown) {
  const response: any = await getRequest(endpoints.user, params, dispatch);
  if (!response) {
    return null;
  }
  if (response.status === 200) {
    const normalized = normalizeUserIndexPayload(response.data);
    dispatch(index(normalized));
    return normalized;
  }
  return response.data;
}

export async function createUser(dispatch: AppDispatch, payload: unknown) {
  const response: any = await postRequest(endpoints.user, payload, dispatch);
  return response.data;
}

export async function updateUser(
  dispatch: AppDispatch,
  args: {
    id: string | number;
    payload: UserFormInputs | Record<string, unknown>;
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
    `${endpoints.user}/${id}`,
    payload,
    dispatch,
  );

  if (response.status === 200) {
    notifications?.show("User is updated successfully", {
      severity: "success",
      autoHideDuration: 3000,
    });
    dispatch(update(response.data as USER));
  }
  return response.data;
}

export async function patchUserColumn(
  dispatch: AppDispatch,
  args: {
    id: string | number;
    payload: Record<string, unknown>;
    column?: string;
  },
) {
  const { id, payload } = args;
  const response: any = await putRequest(
    `${endpoints.user}/${id}`,
    payload,
    dispatch,
  );

  if (response.status === 200) {
    dispatch(update(response.data as USER));
  }
  return response;
}

export async function fetchUserShow(
  dispatch: AppDispatch,
  id: string | number,
) {
  const response: any = await getRequest(
    `${endpoints.user}/${id}`,
    null,
    dispatch,
  );
  if (response.status === 200) {
    dispatch(show(response.data as USER));
  }
  return response.data;
}
