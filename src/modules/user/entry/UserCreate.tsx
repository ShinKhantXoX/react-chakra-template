"use client";
import {
  Button,
  Fieldset,
  Stack,
  Text,
  Box,
  FileUpload,
  Icon,
  Card,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { Breadcrumb } from "@/components/BreadCrumb";
import { FormInput } from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { useUserData } from "../hooks/useUserData";
import { useUserForm } from "../hooks/useUserForm";

const UserCreate = () => {
  const { userStatus, userType } = useUserData();
  const {
    state,
    formAction,
    pending,
    getFieldValue,
    getErrorMessage,
    hasError,
  } = useUserForm();

  return (
    <Box>
      <Breadcrumb />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={6}
      >
        <form action={formAction}>
          <Card.Root width={"1200px"}>
            <Card.Body>
              <Fieldset.Root size="lg" maxW="md">
                <Stack gap="4">
                  <Fieldset.Legend>User Create</Fieldset.Legend>

                  <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
                    <FileUpload.HiddenInput name={"profile"} />
                    <FileUpload.Dropzone>
                      <Icon size="md" color="fg.muted">
                        <LuUpload />
                      </Icon>
                      <FileUpload.DropzoneContent>
                        <Box>Drag and drop files here</Box>
                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                      </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>
                    <FileUpload.List />
                  </FileUpload.Root>

                  {state.message && (
                    <Box
                      p="3"
                      borderRadius="md"
                      bg={state.success ? "green.50" : "red.50"}
                      color={state.success ? "green.800" : "red.800"}
                    >
                      <Text fontSize="sm">{state.message}</Text>
                    </Box>
                  )}

                  <Fieldset.Content>
                    <FormInput
                      label="First Name"
                      name="first_name"
                      value={getFieldValue("first_name")}
                      hasError={hasError("first_name")}
                      errorMessage={getErrorMessage("first_name")}
                    />

                    <FormInput
                      label="Last Name"
                      name="last_name"
                      value={getFieldValue("last_name")}
                      hasError={hasError("last_name")}
                      errorMessage={getErrorMessage("last_name")}
                    />

                    <FormInput
                      label="Email address"
                      name="email"
                      type="email"
                      value={getFieldValue("email")}
                      hasError={hasError("email")}
                      errorMessage={getErrorMessage("email")}
                    />

                    <FormSelect
                      label="Gender"
                      name="gender"
                      value={getFieldValue("gender")}
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Other", value: "other" },
                      ]}
                      placeholder="Select Gender"
                      hasError={hasError("gender")}
                      errorMessage={getErrorMessage("gender")}
                    />

                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      value={getFieldValue("password")}
                      hasError={hasError("password")}
                      errorMessage={getErrorMessage("password")}
                    />

                    <FormInput
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      value={getFieldValue("dob")}
                      hasError={hasError("dob")}
                      errorMessage={getErrorMessage("dob")}
                    />

                    <FormInput
                      label="About (Optional)"
                      name="about"
                      as="textarea"
                      value={getFieldValue("about")}
                      hasError={hasError("about")}
                      errorMessage={getErrorMessage("about")}
                    />

                    <FormSelect
                      label="User Type"
                      name="user_type"
                      value={getFieldValue("user_type")}
                      options={userType}
                      hasError={hasError("user_type")}
                      errorMessage={getErrorMessage("user_type")}
                    />

                    <FormSelect
                      label="Status"
                      name="status"
                      value={getFieldValue("status")}
                      options={userStatus}
                      hasError={hasError("status")}
                      errorMessage={getErrorMessage("status")}
                    />
                  </Fieldset.Content>

                  <Button
                    type="submit"
                    alignSelf="flex-start"
                    loading={pending}
                    disabled={pending}
                  >
                    {pending ? "Creating..." : "Create User"}
                  </Button>
                </Stack>
              </Fieldset.Root>
            </Card.Body>
          </Card.Root>
        </form>
      </Box>
    </Box>
  );
};

export default UserCreate;
