import { Input, Field } from "@chakra-ui/react";
import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  as?: any;
  value: any;
  hasError: boolean;
  errorMessage: string;
}

export const FormInput = ({
  label,
  name,
  type = "text",
  as,
  value,
  hasError,
  errorMessage,
}: FormInputProps) => {
  return (
    <Field.Root invalid={hasError}>
      <Field.Label>{label}</Field.Label>
      <Input name={name} type={type} as={as} defaultValue={value} />
      {hasError && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
};
