import React, { useCallback, useEffect } from "react";
import BrandLayout from "./components/BrandLayout";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { keys } from "@/constants/config";
import { getData } from "@/helpers/localStorage";
import { useAuthService } from "@/modules/auth/auth.service";

const DefaultLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshToken: mutateRefreshToken } = useAuthService();

  const token = getData(keys.API_TOKEN);
  // const refToken = getData(keys.REFRESH_TOKEN);
  const checkRefresh = useSelector((state: any) => state.share.refreshToken);

  const authRedirect = React.useCallback(async () => {
    if (token && location.pathname === "/") {
      navigate("/dashboard");
    }

    if (!token) {
      navigate("/auth/login");
    }
  }, [token, location, navigate]);

  React.useEffect(() => {
    // console.log("Token:", token);
    // console.log("Refresh Token:", refToken);
    // console.log("Current Path:", location.pathname);
    authRedirect();
  }, [authRedirect]);

  const refreshToken = useCallback(() => {
    if (checkRefresh) {
      console.log("Here the refresh logic will be implemented");
      mutateRefreshToken();
    }
  }, [checkRefresh, mutateRefreshToken]);

  console.log("Check Refresh:", checkRefresh);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  return <>{token && <BrandLayout />}</>;
};

export default DefaultLayout;
