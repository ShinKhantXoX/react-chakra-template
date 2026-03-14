import { useAuthService } from "@/modules/auth/auth.service";
import { IconButton } from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";

const Logout = () => {
  const { logout } = useAuthService();

  const handleLogout = async () => {
    logout();
  };

  return (
    <IconButton variant={"outline"} onClick={handleLogout} size={"sm"}>
      <CiLogout />
    </IconButton>
  );
};

export default Logout;
