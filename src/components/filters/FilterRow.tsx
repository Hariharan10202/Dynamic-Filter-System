import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import {
  getDefaultOperator,
  getDefaultValue,
  OPERATORS_BY_TYPE,
  type FilterCondition,
  type FilterFieldDefinition,
  type FilterOperator,
  type FilterValue,
} from "../../types/filter.types";

import { X } from "lucide-react";
import {
  InputAmountRange,
  InputBoolean,
  InputDateRange,
  InputMultiSelect,
  InputNumber,
  InputSingleSelect,
} from ".";
import { InputText } from "./Inputs/InputText";

interface FilterRowProps {
  condition: FilterCondition;
  fieldDefinitions: FilterFieldDefinition[];
  onUpdate: (id: string, updates: Partial<FilterCondition>) => void;
  onRemove: (id: string) => void;
  showRemove: boolean;
}

export const FilterRow = ({
  condition,
  fieldDefinitions,
  onUpdate,
  onRemove,
  showRemove,
}: FilterRowProps) => {
  const selectedField = fieldDefinitions.find((f) => f.key === condition.field);
  const operators = selectedField ? OPERATORS_BY_TYPE[selectedField.type] : [];

  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    const newFieldKey = event.target.value;
    const newField = fieldDefinitions.find((f) => f.key === newFieldKey);

    if (newField) {
      onUpdate(condition.id, {
        field: newFieldKey,
        operator: getDefaultOperator(newField.type),
        value: getDefaultValue(newField.type),
      });
    }
  };

  const handleOperatorChange = (event: SelectChangeEvent<string>) => {
    onUpdate(condition.id, {
      operator: event.target.value as FilterOperator,
    });
  };

  const handleValueChange = (value: FilterValue) => {
    onUpdate(condition.id, { value });
  };

  const renderValueInput = () => {
    if (!selectedField) return null;

    switch (selectedField.type) {
      case "text":
        return (
          <InputText
            value={condition.value as string}
            onChange={handleValueChange}
          />
        );

      case "number":
        return (
          <InputNumber
            value={condition.value as number}
            onChange={handleValueChange}
          />
        );

      case "date":
        return (
          <InputDateRange
            value={
              condition.value as {
                startDate: Date | null;
                endDate: Date | null;
              }
            }
            onChange={handleValueChange}
          />
        );

      case "amount":
        return (
          <InputAmountRange
            value={condition.value as { min?: number; max?: number }}
            onChange={handleValueChange}
          />
        );

      case "singleSelect":
        return (
          <InputSingleSelect
            value={condition.value as string}
            onChange={handleValueChange}
            options={selectedField.options || []}
          />
        );

      case "multiSelect":
        return (
          <InputMultiSelect
            value={condition.value as string[]}
            onChange={handleValueChange}
            options={selectedField.options || []}
          />
        );

      case "boolean":
        return (
          <InputBoolean
            value={condition.value as boolean}
            onChange={handleValueChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "start" },
        gap: 2,
        p: 2,
        pt: { xs: showRemove ? 5 : 2, md: 2 },
        backgroundColor: "rgba(129, 140, 248, 0.05)",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        },
      }}
    >
      {showRemove && (
        <IconButton
          onClick={() => onRemove(condition.id)}
          size="small"
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.secondary",
            transition: "all 0.2s",
          }}
        >
          <X />
        </IconButton>
      )}
      <FormControl
        size="small"
        sx={{
          minWidth: 160,
          width: { xs: "100%", md: "auto" },
          marginTop: { xs: "10px", md: 0 },
        }}
      >
        <Select
          value={condition.field}
          onChange={handleFieldChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>Select field</em>
          </MenuItem>
          {fieldDefinitions.map((field) => (
            <MenuItem key={field.key} value={field.key}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedField && operators.length > 1 && (
        <FormControl
          size="small"
          sx={{ minWidth: 180, width: { xs: "100%", md: "auto" } }}
        >
          <Select value={condition.operator} onChange={handleOperatorChange}>
            {operators.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Box
        sx={{ flexGrow: 1, minWidth: 200, width: { xs: "100%", md: "auto" } }}
      >
        {renderValueInput()}
      </Box>
      {showRemove && (
        <IconButton
          onClick={() => onRemove(condition.id)}
          size="small"
          sx={{
            display: { xs: "none", md: "block" },
            color: "text.secondary",
            transition: "all 0.2s",
          }}
        >
          <X />
        </IconButton>
      )}
    </Box>
  );
};
