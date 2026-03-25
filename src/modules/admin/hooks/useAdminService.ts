import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminFormInputs, adminQueryKeys } from "@/modules/admin/admin.payload";
import {
  createAdmin,
  fetchAdminIndex,
  fetchAdminShow,
  patchAdminColumn,
  updateAdmin,
} from "@/modules/admin/service/admin.api";
import type { AppDispatch } from "@/stores";

export function useAdminIndexQuery(params: unknown, enabled = true) {
  const dispatch = useDispatch<AppDispatch>();
  return useQuery({
    queryKey: [adminQueryKeys.index, params],
    queryFn: () => fetchAdminIndex(dispatch, params),
    enabled,
  });
}

export const useAdminService = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const storeMutation = useMutation({
    mutationFn: (payload: unknown) => createAdmin(dispatch, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.index] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: {
      id: number;
      payload: AdminFormInputs;
      notifications?: {
        show: (
          message: string,
          options: { severity: string; autoHideDuration: number },
        ) => void;
      };
    }) => updateAdmin(dispatch, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.index] });
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.show] });
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: (vars: {
      id: number;
      payload: Record<string, unknown>;
      column?: string;
    }) => patchAdminColumn(dispatch, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.index] });
      queryClient.invalidateQueries({ queryKey: [adminQueryKeys.show] });
    },
  });

  const showMutation = useMutation({
    mutationFn: (id: number) => fetchAdminShow(dispatch, id),
  });

  return {
    store: storeMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    updateColumn: updateColumnMutation.mutateAsync,
    show: showMutation.mutateAsync,
  };
};
