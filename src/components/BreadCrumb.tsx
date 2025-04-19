import { useLoaderData, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, Breadcrumb as Bread, For } from "@chakra-ui/react";

interface breadcrumb {
  label: string;
  url: string;
}

export const Breadcrumb = () => {
  const loaderData: any = useLoaderData();
  const breadcrumbs: breadcrumb[] = loaderData.breadcrumbs;
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <Box display={"flex"} alignItems={"center"} gap={"2"} py={"3"}>
      <For each={breadcrumbs}>
        {(bread, index) => (
          <Bread.Root key={index}>
            <Bread.List>
              <Bread.Item>
                <Bread.Link
                  cursor={"pointer"}
                  onClick={() => navigate(bread.url)}
                >
                  {bread.url !== location.pathname && bread.label}
                </Bread.Link>
              </Bread.Item>
              {bread.url !== location.pathname && <Bread.Separator />}
              <Bread.Item>
                <Bread.CurrentLink cursor={"disabled"}>
                  {bread.url === location.pathname && bread.label}
                </Bread.CurrentLink>
              </Bread.Item>
            </Bread.List>
          </Bread.Root>
        )}
      </For>
    </Box>
  );
};
