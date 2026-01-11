import { Box, Switch, Typography } from "@mui/material";

interface InputBooleanProps {
  value: boolean;
  onChange: (value: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
}

export const InputBoolean = ({
  value,
  onChange,
  trueLabel = "Yes",
  falseLabel = "No",
}: InputBooleanProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: !value ? "text.primary" : "text.secondary",
          fontWeight: !value ? 600 : 400,
          transition: "all 0.2s",
        }}
      >
        {falseLabel}
      </Typography>
      <Switch checked={value} onChange={(e) => onChange(e.target.checked)} />
      <Typography
        variant="body2"
        sx={{
          color: value ? "text.primary" : "text.secondary",
          fontWeight: value ? 600 : 400,
          transition: "all 0.2s",
        }}
      >
        {trueLabel}
      </Typography>
    </Box>
  );
};
