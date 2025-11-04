import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { endpoints } from "@/constants/endpoints";
import { getRequest, postRequest, putRequest } from "@/helpers/api";
import { httpServiceHandler } from "@/helpers/handler";
import { AdminFormInputs } from "@/modules/admin/admin.payload";
import { index, show, update } from "@/modules/admin/admin.slice";

export const useAdminService = () => {
  const dispatch = useDispatch();

  const store = useCallback(
    async (payload: any) => {
      const response: any = await postRequest(
        endpoints.adminCreate,
        payload,
        dispatch
      );
      await httpServiceHandler(dispatch, response);
      console.log(response);

      // if (response.data.statusCode === 201) {
      //   notifications.show("Admin is created successfully", {
      //     severity: "success",
      //     autoHideDuration: 3000,
      //   });
      // }
      return response.data;
    },
    [dispatch]
  );

  const getIndex = useCallback(
    async (params: any) => {
      const response: any = await getRequest(endpoints.admin, params, dispatch);
      await httpServiceHandler(dispatch, response.data);
      console.log(response.data);

      if (response.status === 200) {
        dispatch(index(response.data));
      }
      return response.data;
    },
    [dispatch]
  );

  const updateAdmin = useCallback(
    async (id: number, payload: AdminFormInputs, notifications?: any) => {
      const response: any = await putRequest(
        `${endpoints.admin}/${id}`,
        payload,
        dispatch
      );
      await httpServiceHandler(dispatch, response.data);

      if (response.data.statusCode === 200) {
        notifications?.show("Admin is updated successfully", {
          severity: "success",
          autoHideDuration: 3000,
        });
        dispatch(update(response.data));
      }
      return response.data;
    },
    [dispatch]
  );

  const updateColumn = useCallback(
    async (id: number, payload: any, column?: string) => {
      const response: any = await postRequest(
        `${endpoints.admin}/${id}`,
        payload,
        dispatch
      );
      await httpServiceHandler(dispatch, response.data);

      if (response.status === 200) {
        dispatch(update(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const getShow = useCallback(
    async (id: number) => {
      const response: any = await getRequest(
        `${endpoints.admin}/${id}`,
        null,
        dispatch
      );
      await httpServiceHandler(dispatch, response.data.payload);
      if (response.data.statusCode === 200) {
        dispatch(show(response.data.payload));
      }
      return response.data;
    },
    [dispatch]
  );

  return {
    store,
    index: getIndex,
    update: updateAdmin,
    updateColumn,
    show: getShow,
  };
};
