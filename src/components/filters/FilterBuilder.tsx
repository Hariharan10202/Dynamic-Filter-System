import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { FunnelX, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";
import {
  generateFilterId,
  getDefaultOperator,
  getDefaultValue,
  type FilterCondition,
  type FilterFieldDefinition,
} from "../../types/filter.types";
import { FilterRow } from "./FilterRow";

interface FilterBuilderProps {
  conditions: FilterCondition[];
  fieldDefinitions: FilterFieldDefinition[];
  onConditionsChange: (conditions: FilterCondition[]) => void;
}

export const FilterBuilder = ({
  conditions,
  fieldDefinitions,
  onConditionsChange,
}: FilterBuilderProps) => {
  const handleAddFilter = useCallback(() => {
    const defaultField = fieldDefinitions[0];
    const newCondition: FilterCondition = {
      id: generateFilterId(),
      field: defaultField?.key || "",
      operator: defaultField ? getDefaultOperator(defaultField.type) : "equals",
      value: defaultField ? getDefaultValue(defaultField.type) : "",
    };
    onConditionsChange([...conditions, newCondition]);
  }, [conditions, fieldDefinitions, onConditionsChange]);

  const handleUpdateFilter = useCallback(
    (id: string, updates: Partial<FilterCondition>) => {
      const updatedConditions = conditions.map((condition) =>
        condition.id === id ? { ...condition, ...updates } : condition
      );
      onConditionsChange(updatedConditions);
    },
    [conditions, onConditionsChange]
  );

  const handleRemoveFilter = useCallback(
    (id: string) => {
      const updatedConditions = conditions.filter((c) => c.id !== id);
      onConditionsChange(updatedConditions);
    },
    [conditions, onConditionsChange]
  );

  const handleClearAll = useCallback(() => {
    onConditionsChange([]);
  }, [onConditionsChange]);

  const activeFilterCount = useMemo(() => {
    return conditions.filter((c) => {
      if (c.value === null || c.value === undefined || c.value === "")
        return false;
      if (Array.isArray(c.value) && c.value.length === 0) return false;
      if (typeof c.value === "object" && !Array.isArray(c.value)) {
        const obj = c.value as Record<string, unknown>;
        return Object.values(obj).some((v) => v !== null && v !== undefined);
      }
      return true;
    }).length;
  }, [conditions]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "1.125rem",
            }}
          >
            Filters
          </Typography>
          {activeFilterCount > 0 && (
            <Box
              sx={{
                backgroundColor: "skyblue",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {activeFilterCount}
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {conditions.length > 0 && (
            <Button
              startIcon={<FunnelX />}
              onClick={handleClearAll}
              size="small"
              sx={{
                color: "text.secondary",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              Clear All
            </Button>
          )}
          <Button
            startIcon={<Plus />}
            onClick={handleAddFilter}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "primary.main",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Add Filter
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2, borderColor: "divider" }} />

      {conditions.length === 0 ? (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            No filters applied. Click "Add Filter"
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {conditions.map((condition, index) => (
            <Box key={condition.id}>
              {index > 0 && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "primary.main",
                    fontWeight: 600,
                    mb: 1,
                    ml: 1,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  AND
                </Typography>
              )}
              <FilterRow
                condition={condition}
                fieldDefinitions={fieldDefinitions}
                onUpdate={handleUpdateFilter}
                onRemove={handleRemoveFilter}
                showRemove={conditions.length > 0}
              />
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
};
