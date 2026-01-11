import { TextField } from "@mui/material";
import React from "react";

interface InputTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  placeholder = "Enter value...",
}) => {
  return (
    <TextField
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      fullWidth
    />
  );
};
