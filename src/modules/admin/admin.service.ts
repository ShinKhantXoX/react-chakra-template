import { useDispatch } from "react-redux";
import { endpoints } from "@/constants/endpoints";
import { getRequest, postRequest, putRequest } from "@/helpers/api";
import { httpServiceHandler } from "@/helpers/handler";
import { AdminFormInputs, adminQueryKeys } from "@/modules/admin/admin.payload";
import { index, show, update } from "@/modules/admin/admin.slice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminService = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const storeMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response: any = await postRequest(
        endpoints.adminCreate,
        payload,
        dispatch
      );
      await httpServiceHandler(dispatch, response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.index] });
    },
  });

  const useAdminIndex = (params: any, enabled = true) => {
    return useQuery({
      queryKey: [adminQueryKeys.index, params],
      queryFn: async () => {
        const response: any = await getRequest(endpoints.admin, params, dispatch);
        await httpServiceHandler(dispatch, response.data);
        if (response.status === 200) {
          dispatch(index(response.data));
        }
        return response.data;
      },
      enabled,
    });
  };

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
      notifications,
    }: {
      id: number;
      payload: AdminFormInputs;
      notifications?: any;
    }) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.index] });
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.show] });
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
      column,
    }: {
      id: number;
      payload: any;
      column?: string;
    }) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.index] });
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.show] });
    },
  });

  const showMutation = useMutation({
    mutationFn: async (id: number) => {
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
  });

  return {
    store: storeMutation.mutateAsync,
    useAdminIndex,
    update: updateMutation.mutateAsync,
    updateColumn: updateColumnMutation.mutateAsync,
    show: showMutation.mutateAsync,
  };
};
