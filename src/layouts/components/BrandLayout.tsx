import DarkModeToggle from "@/components/DarkModeToggle";
import {
  IconButton,
  Card,
  CloseButton,
  Drawer,
  Portal,
  Box,
  Stack,
  For,
  Text,
} from "@chakra-ui/react";
import { CiMenuBurger } from "react-icons/ci";
import { navigationlists } from "../defaultPaths";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logout from "@/components/Logout";
import Account from "@/components/Account";

const BrandLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (segment: string) => {
    navigate(segment);
    setIsOpen(false); // This will close the drawer
  };

  return (
    <Box bg={"pageBg"}>
      <Card.Root>
        <Card.Body>
          <Box display={"flex"} justifyContent="space-between">
            <Drawer.Root placement={"start"} open={isOpen}>
              <Drawer.Trigger asChild>
                <IconButton
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                >
                  <CiMenuBurger />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content bg="surfaceBg">
                    <Drawer.Header>
                      <Drawer.Title>Starter Kit</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body p={"0"}>
                      <Stack>
                        <For each={navigationlists}>
                          {(item, index) => (
                            <Box
                              key={index}
                              px={"6"}
                              py={"2"}
                              cursor={"pointer"}
                              display={"flex"}
                              justifyContent={"start"}
                              alignItems={"center"}
                              gap={"2"}
                              _hover={{
                                backgroundColor: "gray.100",
                                _dark: {
                                  backgroundColor: "gray.700",
                                },
                              }}
                              onClick={() => handleNavigation(item.segment)}
                            >
                              {item.icon}
                              <Text fontWeight="bold">{item.title}</Text>
                            </Box>
                          )}
                        </For>
                      </Stack>
                    </Drawer.Body>
                    <Drawer.Footer>Love is not real</Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" onClick={() => setIsOpen(false)} />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>

            <Box display={"flex"} gap="2">
              <Account />
              <DarkModeToggle />
              <Logout />
            </Box>
          </Box>
        </Card.Body>
      </Card.Root>

      <Outlet />
    </Box>
  );
};

export default BrandLayout;
