import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface Option {
  value: string;
  label: string;
}

interface InputMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
}

export const InputMultiSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select options...",
}: InputMultiSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValue = event.target.value;
    onChange(typeof newValue === "string" ? newValue.split(",") : newValue);
  };

  const getLabel = (val: string): string => {
    const option = options.find((o) => o.value === val);
    return option ? option.label : val;
  };

  return (
    <FormControl size="small" fullWidth>
      <Select<string[]>
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput />}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em style={{ color: "#64748b" }}>{placeholder}</em>;
          }
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.slice(0, 2).map((val) => (
                <Chip
                  key={val}
                  label={getLabel(val)}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(129, 140, 248, 0.2)",
                    color: "primary.light",
                    height: "20px",
                    "& .MuiChip-label": {
                      px: 1,
                      fontSize: "0.75rem",
                    },
                  }}
                />
              ))}
              {selected.length > 2 && (
                <Chip
                  label={`+${selected.length - 2} more`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "text.secondary",
                    height: "20px",
                    "& .MuiChip-label": {
                      px: 1,
                      fontSize: "0.75rem",
                    },
                  }}
                />
              )}
            </Box>
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.includes(option.value)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
