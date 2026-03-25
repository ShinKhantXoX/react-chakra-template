import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserFormInputs, userQueryKeys } from "@/modules/user/user.payload";
import {
  createUser,
  fetchUserIndex,
  fetchUserShow,
  patchUserColumn,
  updateUser,
} from "@/modules/user/service/user.api";
import type { AppDispatch } from "@/stores";

export function useUserIndexQuery(params: unknown, enabled = true) {
  const dispatch = useDispatch<AppDispatch>();
  return useQuery({
    queryKey: [userQueryKeys.index, params],
    queryFn: () => fetchUserIndex(dispatch, params),
    enabled,
  });
}

export const useUserService = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const storeMutation = useMutation({
    mutationFn: (payload: unknown) => createUser(dispatch, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.index] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: {
      id: string | number;
      payload: UserFormInputs | Record<string, unknown>;
      notifications?: {
        show: (
          message: string,
          options: { severity: string; autoHideDuration: number },
        ) => void;
      };
    }) => updateUser(dispatch, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.index] });
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.show] });
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: (vars: {
      id: string | number;
      payload: Record<string, unknown>;
      column?: string;
    }) => patchUserColumn(dispatch, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.index] });
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.show] });
    },
  });

  const showMutation = useMutation({
    mutationFn: (id: string | number) => fetchUserShow(dispatch, id),
  });

  return {
    store: storeMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    updateColumn: updateColumnMutation.mutateAsync,
    show: showMutation.mutateAsync,
  };
};
