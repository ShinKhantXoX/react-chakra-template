import { useAuthService } from "@/modules/auth/auth.service";
import { IconButton } from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";
import { useSetAbilityFromUser } from "@/ability/AppAbilityProvider";

const Logout = () => {
  const { logout } = useAuthService();
  const setAbilityFromUser = useSetAbilityFromUser();

  const handleLogout = async () => {
    setAbilityFromUser(null);
    await logout();
  };

  return (
    <IconButton variant={"outline"} onClick={handleLogout} size={"sm"}>
      <CiLogout />
    </IconButton>
  );
};

export default Logout;
