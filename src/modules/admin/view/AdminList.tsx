"use client";
import { Breadcrumb } from "@/components/BreadCrumb";
import {
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
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { GoSortAsc } from "react-icons/go";
import { columns } from "../admin.payload";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppDispatch, AppRootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { setPaginate } from "../admin.slice";
import { adminService } from "../admin.service";
import { CiSearch } from "react-icons/ci";
import { paginateOptions } from "@/constants/config";

const AdminList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, pagingParams } = useSelector(
    (state: AppRootState) => state.admin
  );
  const [loading, setLoading] = useState(false);

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
        })
      );
    }, 3000);
  };

  const handleNextPage = (currentPage: number): void => {
    dispatch(
      setPaginate({
        ...pagingParams,
        page: currentPage + 1,
      })
    );
  };

  const handleChangePage = (currentPage: number): void => {
    dispatch(
      setPaginate({
        ...pagingParams,
        page: currentPage,
      })
    );
  };

  const handlePrevPage = (currentPage: number): void => {
    dispatch(
      setPaginate({
        ...pagingParams,
        page: currentPage - 1,
      })
    );
  };

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    dispatch(
      setPaginate({
        ...pagingParams,
        // page: 1,
        per_page: rowsPerPage,
      })
    );
    // setRowsPerPage(+event.target.value);
    // setPage(0);
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    await adminService.index(dispatch, pagingParams);
    setLoading(false);
  }, [dispatch, pagingParams]);

  useEffect(() => {
    loadingData();
  }, [pagingParams, loadingData]);

  return (
    <Container>
      <Breadcrumb />

      <Stack width="full" gap="5">
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Heading size="xl">Admin Lists</Heading>
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
                  <Table.ColumnHeader key={index} userSelect={"none"}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      {column.label}
                      {column.sortable && (
                        <Icon size={"md"} cursor={"pointer"}>
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
              data?.data?.data?.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>
                    <Status.Root colorPalette="green">
                      <Status.Indicator />
                      {item.status}
                    </Status.Root>
                  </Table.Cell>
                  <Table.Cell>{item.action}</Table.Cell>
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
            count={data.data.total}
            pageSize={data.data.per_page}
            page={data.data.current_page}
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

export default AdminList;
