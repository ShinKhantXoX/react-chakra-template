import { useActionState } from "react";
import { useUserService } from "./useUserService";
import { z } from "zod";
import { userSchema } from "@/modules/user/user.payload";
import { formBuilder } from "@/helpers/formBuilder";

export type UserFormErrors = {
  [key: string]: string[] | undefined;
} | null;

export interface UserFormState {
  success: boolean;
  message: string;
  errors: UserFormErrors;
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

export function createUserAction(
  userService: ReturnType<typeof useUserService>,
) {
  return async (
    _prevState: UserFormState,
    formData: FormData,
  ): Promise<UserFormState> => {
    const extractedData = {
      profile: formData.get("profile") as File,
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

    const rawData = {
      profile: extractedData.profile,
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
      const validatedData = userSchema.parse(rawData);
      const payload = {
        ...validatedData,
        dob: validatedData.dob.toISOString().split("T")[0],
      };
      const apiFormData = formBuilder(payload, userSchema);
      await userService.store(apiFormData);

      return {
        success: true,
        message: "User created successfully!",
        errors: null,
        formData: undefined,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        return {
          success: false,
          message: "Please fix the validation errors below",
          errors: fieldErrors,
          formData: extractedData,
        };
      }

      if (error instanceof Error) {
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

export const useUserForm = () => {
  const userService = useUserService();
  const [state, formAction, pending] = useActionState(
    createUserAction(userService),
    {
      success: false,
      message: "",
      errors: null,
      formData: undefined,
    },
  );

  const getFieldValue = (
    fieldName: keyof NonNullable<UserFormState["formData"]>,
  ) => {
    return state.formData?.[fieldName] || "";
  };

  const getErrorMessage = (fieldName: string) => {
    return state.errors?.[fieldName]?.[0] || "";
  };

  const hasError = (fieldName: string) => {
    return !!state.errors?.[fieldName];
  };

  return {
    state,
    formAction,
    pending,
    getFieldValue,
    getErrorMessage,
    hasError,
  };
};
