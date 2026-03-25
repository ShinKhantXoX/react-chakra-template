import { useDispatch } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { adminQueryKeys } from "@/modules/admin/admin.payload";
import {
  fetchAdminStatusByType,
  type AdminStatusType,
} from "@/modules/admin/service/admin.api";
import type { AppDispatch } from "@/stores";

const statusTypes: AdminStatusType[] = ["user", "user_type"];

export const useAdminData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const results = useQueries({
    queries: statusTypes.map((type) => ({
      queryKey: [adminQueryKeys.status, type] as const,
      queryFn: () => fetchAdminStatusByType(dispatch, type),
    })),
  });

  const [userQuery, userTypeQuery] = results;

  return {
    adminStatus: userQuery?.data ?? [],
    adminType: userTypeQuery?.data ?? [],
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
  };
};
