"use client";
import { z } from "zod";
import { useActionState, useCallback, useEffect, useState } from "react"; // Removed useFormStatus import
import {
  adminSchema,
  type AdminFormInputs,
} from "@/modules/admin/admin.payload";
import {
  Button,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Stack,
  Text,
  Box,
  FileUpload,
  Icon,
  Card,
} from "@chakra-ui/react";
import { useAdminService } from "../admin.service";
import { endpoints } from "@/constants/endpoints";
import { getRequest } from "@/helpers/api";
import { useDispatch } from "react-redux";
import { LuUpload } from "react-icons/lu";

// Define the error type based on Zod's actual output
type FormErrors = {
  [key: string]: string[] | undefined;
} | null;

interface FormState {
  success: boolean;
  message: string;
  errors: FormErrors;
  formData?: {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    password: string;
    dob: string;
    about: string;
    user_type: string;
    status: string;
  };
}

// Server action
function createAdminAction(adminService: ReturnType<typeof useAdminService>) {
  return async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    // Extract form data and preserve it
    const extractedData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      gender: formData.get("gender") as string,
      password: formData.get("password") as string,
      dob: formData.get("dob") as string,
      about: formData.get("about") as string,
      user_type: formData.get("user_type") as string,
      status: formData.get("status") as string,
    };

    // Prepare data for validation
    const rawData = {
      first_name: extractedData.first_name,
      last_name: extractedData.last_name,
      email: extractedData.email,
      gender: extractedData.gender,
      password: extractedData.password,
      dob: extractedData.dob ? new Date(extractedData.dob) : new Date(),
      about: extractedData.about,
      user_type: extractedData.user_type,
      status: extractedData.status,
    };

    try {
      console.log("Validating data:", rawData);

      const validatedData = adminSchema.parse(rawData);
      console.log("Validated data:", validatedData);
      const payload = {
        ...validatedData,
        dob: validatedData.dob.toISOString().split("T")[0], // convert just before API call
      };
      // Use the hook-based service
      console.log("Calling adminService.store...");
      const res = await adminService.store(payload);
      console.log("Service response:", res);

      return {
        success: true,
        message: "Admin created successfully!",
        errors: null,
        formData: undefined,
      };
    } catch (error) {
      console.error("Error in createAdmin:", error);

      if (error instanceof z.ZodError) {
        console.log("Zod validation error:", error.errors);
        const fieldErrors = error.flatten().fieldErrors;
        return {
          success: false,
          message: "Please fix the validation errors below",
          errors: fieldErrors,
          formData: extractedData,
        };
      }

      if (error instanceof Error) {
        console.error("Error message:", error.message);
        return {
          success: false,
          message: error.message,
          errors: null,
          formData: extractedData,
        };
      }

      return {
        success: false,
        message: "An unexpected error occurred",
        errors: null,
        formData: extractedData,
      };
    }
  };
}

// Remove the separate SubmitButton component since we don't have useFormStatus anymore

const AdminCreate = () => {
  const adminService = useAdminService();
  // useActionState now returns [state, formAction, pending]
  const [state, formAction, pending] = useActionState(
    createAdminAction(adminService),
    {
      success: false,
      message: "",
      errors: null,
      formData: undefined,
    }
  );
  const [adminStatus, setAdminStatus] = useState([]);
  const [adminType, setAdminType] = useState([]);
  const dispatch = useDispatch();

  const loadingData = useCallback(async () => {
    const adminStatusResponse: any = await getRequest(
      `${endpoints.status}?type=user`,
      null,
      dispatch
    );

    if (adminStatusResponse.status === 200) {
      setAdminStatus(adminStatusResponse.data.user);
    }

    const adminTypeResponse: any = await getRequest(
      `${endpoints.status}?type=user_type`,
      null,
      dispatch
    );

    if (adminTypeResponse.status === 200) {
      setAdminType(adminTypeResponse.data.user_type);
    }
  }, [dispatch]);

  console.log("Admin status", adminStatus);
  console.log("Admin type", adminType);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  // Helper function to get field value (either from state or empty)
  const getFieldValue = (
    fieldName: keyof NonNullable<FormState["formData"]>
  ) => {
    return state.formData?.[fieldName] || "";
  };

  // Helper function to get error message
  const getErrorMessage = (fieldName: string) => {
    return state.errors?.[fieldName]?.[0] || "";
  };

  // Check if field has error
  const hasError = (fieldName: string) => {
    return !!state.errors?.[fieldName];
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} p={6}>
      <form action={formAction}>
        <Card.Root width={"1200px"}>
          <Card.Body>
            <Fieldset.Root size="lg" maxW="md">
              <Stack gap="4">
                <Fieldset.Legend>Admin Create</Fieldset.Legend>

                <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={10}>
                  <FileUpload.HiddenInput />
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

                {/* Display success/error message */}
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
                  {/* First Name */}
                  <Field.Root invalid={hasError("FirstName")}>
                    <Field.Label>First Name</Field.Label>
                    <Input
                      name="first_name"
                      defaultValue={getFieldValue("first_name")}
                    />
                    {hasError("FirstName") && (
                      <Field.ErrorText>
                        {getErrorMessage("FirstName")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Last Name */}
                  <Field.Root invalid={hasError("LastName")}>
                    <Field.Label>Last Name</Field.Label>
                    <Input
                      name="last_name"
                      defaultValue={getFieldValue("last_name")}
                    />
                    {hasError("LastName") && (
                      <Field.ErrorText>
                        {getErrorMessage("LastName")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Email */}
                  <Field.Root invalid={hasError("Email")}>
                    <Field.Label>Email address</Field.Label>
                    <Input
                      name="email"
                      type="email"
                      defaultValue={getFieldValue("email")}
                    />
                    {hasError("Email") && (
                      <Field.ErrorText>
                        {getErrorMessage("Email")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Gender */}
                  <Field.Root invalid={hasError("Gender")}>
                    <Field.Label>Gender</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        name="gender"
                        defaultValue={getFieldValue("gender")}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {hasError("Gender") && (
                      <Field.ErrorText>
                        {getErrorMessage("Gender")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Password */}
                  <Field.Root invalid={hasError("Password")}>
                    <Field.Label>Password</Field.Label>
                    <Input
                      name="password"
                      type="password"
                      defaultValue={getFieldValue("password")}
                    />
                    {hasError("Password") && (
                      <Field.ErrorText>
                        {getErrorMessage("Password")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Date of Birth */}
                  <Field.Root invalid={hasError("dob")}>
                    <Field.Label>Date of Birth</Field.Label>
                    <Input
                      name="dob"
                      type="date"
                      defaultValue={getFieldValue("dob")}
                    />
                    {hasError("dob") && (
                      <Field.ErrorText>
                        {getErrorMessage("dob")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* About */}
                  <Field.Root invalid={hasError("about")}>
                    <Field.Label>About (Optional)</Field.Label>
                    <Input
                      name="about"
                      as="textarea"
                      defaultValue={getFieldValue("about")}
                    />
                    {hasError("about") && (
                      <Field.ErrorText>
                        {getErrorMessage("about")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* User Type */}
                  <Field.Root invalid={hasError("UserType")}>
                    <Field.Label>User Type</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        name="user_type"
                        defaultValue={getFieldValue("user_type")}
                      >
                        {adminType.length > 0 &&
                          adminType.map((typeItem: any) => (
                            <option key={typeItem} value={typeItem}>
                              {typeItem}
                            </option>
                          ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {hasError("UserType") && (
                      <Field.ErrorText>
                        {getErrorMessage("UserType")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Status */}
                  <Field.Root invalid={hasError("status")}>
                    <Field.Label>Status</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        name="status"
                        defaultValue={getFieldValue("status")}
                      >
                        {adminStatus.length > 0 &&
                          adminStatus.map((statusItem: any) => (
                            <option key={statusItem} value={statusItem}>
                              {statusItem}
                            </option>
                          ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {hasError("status") && (
                      <Field.ErrorText>
                        {getErrorMessage("status")}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                </Fieldset.Content>

                {/* Submit button with pending state from useActionState */}
                <Button
                  type="submit"
                  alignSelf="flex-start"
                  loading={pending}
                  disabled={pending}
                >
                  {pending ? "Creating..." : "Create Admin"}
                </Button>
              </Stack>
            </Fieldset.Root>
          </Card.Body>
        </Card.Root>
      </form>
    </Box>
  );
};

export default AdminCreate;
