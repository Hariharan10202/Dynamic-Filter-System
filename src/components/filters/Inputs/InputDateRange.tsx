import { Box, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface DateRangeValue {
  startDate: Date | null;
  endDate: Date | null;
}

interface InputDateRangeProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
}

export const InputDateRange = ({ value, onChange }: InputDateRangeProps) => {
  const handleStartDateChange = (date: Date | null) => {
    onChange({ ...value, startDate: date });
  };

  const handleEndDateChange = (date: Date | null) => {
    onChange({ ...value, endDate: date });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
      >
        <DatePicker
          value={value.startDate}
          onChange={handleStartDateChange}
          maxDate={value.endDate ?? undefined}
          slotProps={{
            textField: {
              size: "small",
              placeholder: "Start date",
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", flexShrink: 0 }}
        >
          to
        </Typography>

        <DatePicker
          value={value.endDate}
          onChange={handleEndDateChange}
          minDate={value.startDate ?? undefined}
          slotProps={{
            textField: {
              size: "small",
              placeholder: "End date",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
