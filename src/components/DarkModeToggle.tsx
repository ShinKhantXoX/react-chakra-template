// src/components/DarkModeToggle.js
import { useColorMode } from "@/components/ui/color-mode";
import { IconButton } from "@chakra-ui/react";
import { CiSun } from "react-icons/ci";
import { BsFillCloudMoonFill } from "react-icons/bs";

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="Toggle dark mode"
      variant="ghost"
    >
      {colorMode === "light" ? <CiSun /> : <BsFillCloudMoonFill />}
    </IconButton>
  );
};

export default DarkModeToggle;
