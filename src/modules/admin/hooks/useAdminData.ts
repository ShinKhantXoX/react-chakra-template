import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "@/constants/endpoints";
import { getRequest } from "@/helpers/api";

export const useAdminData = () => {
  const [adminStatus, setAdminStatus] = useState<string[]>([]);
  const [adminType, setAdminType] = useState<string[]>([]);
  const dispatch = useDispatch();

  const loadingData = useCallback(async () => {
    const adminStatusResponse: any = await getRequest(
      `${endpoints.status}?type=user`,
      null,
      dispatch
    );

    if (adminStatusResponse.status === 200) {
      setAdminStatus(adminStatusResponse.data.user);
    }

    const adminTypeResponse: any = await getRequest(
      `${endpoints.status}?type=user_type`,
      null,
      dispatch
    );

    if (adminTypeResponse.status === 200) {
      setAdminType(adminTypeResponse.data.user_type);
    }
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return { adminStatus, adminType };
};
