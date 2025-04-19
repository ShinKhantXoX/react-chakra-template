import { authService } from "@/modules/auth/auth.service";
import { IconButton } from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    authService.logout(dispatch);
  };

  return (
    <IconButton variant={"outline"} onClick={logout} size={"sm"}>
      <CiLogout />
    </IconButton>
  );
};

export default Logout;
