import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "./ui/toaster";

const EditableColumn = ({
  column,
  value,
  id,
  service,
}: {
  column: string;
  value: string;
  id: string | number;
  service: any;
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue === value) return;
      try {
        const payload = { [column]: inputValue };
        const response = await service.updateColumn({ id, payload, column });
        if (response.status === 200) {
          toaster.create({
            title: "Update success",
            description: `${column} is updated successfully`,
            type: "success",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Column update error: ", error);
      }
    }
  };

  return (
    <Editable.Root
      value={inputValue}
      activationMode="dblclick"
      textAlign="start"
      size="md"
    >
      <EditablePreview />
      <EditableInput
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Editable.Root>
  );
};

export default EditableColumn;
