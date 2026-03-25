"use client";
import { Breadcrumb } from "@/components/BreadCrumb";
import {
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Icon,
  Pagination,
  Stack,
  Table,
  Container,
  Box,
  Status,
  InputGroup,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { paths } from "@/constants/paths";
import { PermissionGate } from "@/ability/PermissionGate";
import { Permission } from "@/ability/permissions";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { GoSortAsc } from "react-icons/go";
import { columns } from "../user.payload";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, AppRootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { setPaginate } from "../user.slice";
import { CiSearch } from "react-icons/ci";
import { paginateOptions } from "@/constants/config";
import { MdOutlineEditNote, MdOutlineDelete } from "react-icons/md";
import EditableColumn from "@/components/EditableColumn";
import { useUserIndexQuery, useUserService } from "../hooks/useUserService";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.user,
  );
  const userService = useUserService();
  const { isLoading, isFetching } = useUserIndexQuery(pagingParams);
  const loading = isLoading || isFetching;

  const [searchValue, setSearchValue] = useState(pagingParams.search || "");
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      dispatch(
        setPaginate({
          ...pagingParams,
          search: value,
        }),
      );
    }, 3000);
  };

  const handleNextPage = (currentPage: number): void => {
    dispatch(
      setPaginate({
        ...pagingParams,
        page: currentPage + 1,
      }),
    );
  };

  const handleChangePage = (currentPage: number): void => {
    dispatch(
      setPaginate({
        ...pagingParams,
        page: currentPage,
      }),
    );
  };

  const handlePrevPage = (currentPage: number): void => {
    dispatch(
      setPaginate({
        ...pagingParams,
        page: currentPage - 1,
      }),
    );
  };

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    dispatch(
      setPaginate({
        ...pagingParams,
        rows: rowsPerPage,
      }),
    );
  };

  return (
    <Container>
      <Breadcrumb />

      <Stack width="full" gap="5">
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box display="flex" alignItems="center" gap="3">
            <Heading size="xl">User Lists</Heading>
            <PermissionGate permission={Permission.USER_STORE}>
              <Button size="sm" variant="outline" asChild>
                <RouterLink to={paths.userCreate}>Create user</RouterLink>
              </Button>
            </PermissionGate>
          </Box>
          <Box>
            <InputGroup
              endAddon={
                <Icon cursor={"pointer"}>
                  <CiSearch />
                </Icon>
              }
            >
              <Input
                placeholder="Enter your search"
                value={searchValue}
                onChange={handleChange}
                size="sm"
              />
            </InputGroup>
          </Box>
        </Box>

        <Table.Root
          size="sm"
          variant="outline"
          striped
          stickyHeader
          colorPalette={"transparent"}
        >
          <Table.Header>
            <Table.Row>
              {columns?.map((column, index) => {
                return (
                  <Table.ColumnHeader
                    width={column.maxWidth}
                    key={column.id || `col-${index}`}
                    userSelect={"none"}
                  >
                    <Box display={"flex"} justifyContent={"space-between"}>
                      {column.label}
                      {column.sortable && (
                        <Icon
                          onClick={() => {
                            dispatch(
                              setPaginate({
                                ...pagingParams,
                                order: column.id,
                                sort:
                                  pagingParams.sort === "asc" ? "desc" : "asc",
                              }),
                            );
                          }}
                          size={"md"}
                          cursor={"pointer"}
                        >
                          <GoSortAsc />
                        </Icon>
                      )}
                    </Box>
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {!loading &&
              data?.data?.data?.map((item, index) => (
                <Table.Row key={`row-${item.id}-${index}`}>
                  <Table.Cell>
                    <EditableColumn
                      column="username"
                      value={item.username}
                      id={item.id}
                      service={userService}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <EditableColumn
                      column="email"
                      value={item.email ?? ""}
                      id={item.id}
                      service={userService}
                    />
                  </Table.Cell>
                  <Table.Cell>{item.phone ?? "—"}</Table.Cell>
                  <Table.Cell>
                    {item.created_at
                      ? String(item.created_at).slice(0, 10)
                      : "—"}
                  </Table.Cell>
                  <Table.Cell>
                    <Status.Root colorPalette="green">
                      <Status.Indicator />
                      {item.status}
                    </Status.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Box
                      width={"100%"}
                      display={"flex"}
                      gap={4}
                      justifyContent={"start"}
                      alignItems={"center"}
                    >
                      <Icon size={"md"} cursor={"pointer"} color={"blue.500"}>
                        <MdOutlineEditNote />
                      </Icon>
                      <Icon size={"md"} cursor={"pointer"} color={"red.500"}>
                        <MdOutlineDelete />
                      </Icon>
                    </Box>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>

        <Box display="flex" justifyContent="end">
          <NativeSelect.Root size="sm" width="80px">
            <NativeSelect.Field
              placeholder="Select option"
              onChange={(e) =>
                handleChangeRowsPerPage(Number(e.currentTarget.value))
              }
            >
              {paginateOptions.rowsPerPageOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>

          <Pagination.Root
            count={Math.max(data.data.total, 0)}
            pageSize={Math.max(data.data.per_page, 1)}
            page={Math.max(data.data.current_page, 1)}
          >
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
              <Pagination.PrevTrigger asChild>
                <IconButton
                  onClick={() => handlePrevPage(data.data.current_page)}
                >
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton
                    key={`page-${page.value}`}
                    variant={{ base: "ghost", _selected: "outline" }}
                    onClick={() => handleChangePage(page.value)}
                  >
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton
                  onClick={() => handleNextPage(data.data.current_page)}
                >
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Box>
      </Stack>
    </Container>
  );
};

export default UserList;
