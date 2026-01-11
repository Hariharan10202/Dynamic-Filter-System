import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface Option {
  value: string;
  label: string;
}

interface InputSingleSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export const InputSingleSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select option...",
}: InputSingleSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" fullWidth>
      <Select value={value} onChange={handleChange} displayEmpty>
        <MenuItem value="" disabled>
          <em style={{ color: "#64748b" }}>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
