import { useActionState } from "react";
import { useAdminService } from "../admin.service";
import { z } from "zod";
import { adminSchema } from "@/modules/admin/admin.payload";
import { formBuilder } from "@/helpers/formBuilder";

export type FormErrors = {
  [key: string]: string[] | undefined;
} | null;

export interface FormState {
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

export function createAdminAction(adminService: ReturnType<typeof useAdminService>) {
  return async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    // Extract form data and preserve it
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

    // Prepare data for validation
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
      console.log("Validating data:", rawData);

      const validatedData = adminSchema.parse(rawData);
      console.log("Validated data:", validatedData);
      const payload = {
        ...validatedData,
        dob: validatedData.dob.toISOString().split("T")[0], // convert just before API call
      };
      console.log("Payload", payload);
      const apiFormData = formBuilder(payload, adminSchema);

      // Use the hook-based service
      console.log("Calling adminService.store...");
      const res = await adminService.store(apiFormData);
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

export const useAdminForm = () => {
  const adminService = useAdminService();
  const [state, formAction, pending] = useActionState(
    createAdminAction(adminService),
    {
      success: false,
      message: "",
      errors: null,
      formData: undefined,
    }
  );

  const getFieldValue = (
    fieldName: keyof NonNullable<FormState["formData"]>
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
