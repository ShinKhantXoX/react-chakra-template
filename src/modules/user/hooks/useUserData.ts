import { useDispatch } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { userQueryKeys } from "@/modules/user/user.payload";
import {
  fetchUserStatusByType,
  type UserStatusType,
} from "@/modules/user/service/user.api";
import type { AppDispatch } from "@/stores";

const statusTypes: UserStatusType[] = ["user", "user_type"];

export const useUserData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const results = useQueries({
    queries: statusTypes.map((type) => ({
      queryKey: [userQueryKeys.status, type] as const,
      queryFn: () => fetchUserStatusByType(dispatch, type),
    })),
  });

  const [userQuery, userTypeQuery] = results;

  return {
    userStatus: userQuery?.data ?? [],
    userType: userTypeQuery?.data ?? [],
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
  };
};
