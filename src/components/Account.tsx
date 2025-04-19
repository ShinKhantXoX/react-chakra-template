import { keys } from "@/constants/config";
import { getData } from "@/helpers/localStorage";
import { Avatar, AvatarGroup } from "@chakra-ui/react";

const Account = () => {
  const user = getData(keys.USER);
  return (
    <AvatarGroup>
      <Avatar.Root>
        <Avatar.Fallback name={user.email} />
        <Avatar.Image />
      </Avatar.Root>
    </AvatarGroup>
  );
};

export default Account;
