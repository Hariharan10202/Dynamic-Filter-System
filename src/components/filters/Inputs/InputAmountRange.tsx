import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface AmountRangeValue {
  min?: number;
  max?: number;
}

interface InputAmountRangeProps {
  value: AmountRangeValue;
  onChange: (value: AmountRangeValue) => void;
}

export const InputAmountRange = ({
  value,
  onChange,
}: InputAmountRangeProps) => {
  const [minError, setMinError] = useState<string | null>(null);
  const [maxError, setMaxError] = useState<string | null>(null);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "") {
      onChange({ ...value, min: undefined });
    } else {
      const parsed = parseFloat(newValue);
      if (!isNaN(parsed)) {
        onChange({ ...value, min: parsed });
      } else {
        const parsed = Number(newValue);

        if (isNaN(parsed)) {
          setMinError("Invalid number");
          return;
        }
      }
      setMinError(null);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      onChange({ ...value, max: undefined });
    } else {
      const parsed = parseFloat(newValue);
      if (!isNaN(parsed)) {
        onChange({ ...value, max: parsed });
      } else {
        const parsed = Number(newValue);

        if (isNaN(parsed)) {
          setMaxError("Invalid number");
          return;
        }
      }
      setMaxError(null);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
      <TextField
        size="small"
        value={value.min ?? ""}
        onChange={handleMinChange}
        placeholder="Min"
        error={!!minError}
        helperText={minError}
      />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", flexShrink: 0 }}
      >
        to
      </Typography>
      <TextField
        size="small"
        value={value.max ?? ""}
        onChange={handleMaxChange}
        placeholder="Max"
        error={!!maxError}
        helperText={maxError}
      />
    </Box>
  );
};
