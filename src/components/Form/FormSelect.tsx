import { NativeSelect, Field } from "@chakra-ui/react";
import React from "react";

interface FormSelectProps {
  label: string;
  name: string;
  value: any;
  options: any[];
  hasError: boolean;
  errorMessage: string;
  placeholder?: string;
}

export const FormSelect = ({
  label,
  name,
  value,
  options,
  hasError,
  errorMessage,
  placeholder,
}: FormSelectProps) => {
  return (
    <Field.Root invalid={hasError}>
      <Field.Label>{label}</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field name={name} defaultValue={value}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.length > 0 &&
            options.map((opt, idx) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const lbl = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={idx} value={val}>
                  {lbl}
                </option>
              );
            })}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      {hasError && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
};
