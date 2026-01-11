import { TextField } from "@mui/material";
import { useState } from "react";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const InputNumber = ({
  value,
  onChange,
  placeholder = "Enter number...",
}: InputNumberProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (raw === "") {
      setError(null);
      onChange(0);
      return;
    }

    if (/[eE+-]/.test(raw)) {
      setError("Only positive numbers are allowed");
      return;
    }

    const parsed = Number(raw);

    if (isNaN(parsed)) {
      setError("Invalid number");
      return;
    }

    setError(null);
    onChange(parsed);
  };

  return (
    <TextField
      size="small"
      value={value === 0 ? "" : value}
      onChange={handleChange}
      placeholder={placeholder}
      fullWidth
      error={!!error}
      helperText={error}
      inputProps={{
        min: 0,
      }}
    />
  );
};
