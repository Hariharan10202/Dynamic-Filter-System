import type { Employee } from "../types/employee.types";
import type {
  FilterCondition,
  FilterFieldDefinition,
  FilterOperator,
} from "../types/filter.types";

export const getNestedValue = (
  obj: Record<string, unknown>,
  path: string
): unknown => {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
};

const matchTextFilter = (
  value: string | null | undefined,
  operator: FilterOperator,
  filterValue: string
): boolean => {
  if (value === null || value === undefined) return false;

  const normalizedValue = String(value).toLowerCase();
  const normalizedFilter = filterValue.toLowerCase();

  switch (operator) {
    case "equals":
      return normalizedValue === normalizedFilter;
    case "contains":
      return normalizedValue.includes(normalizedFilter);
    case "startsWith":
      return normalizedValue.startsWith(normalizedFilter);
    case "endsWith":
      return normalizedValue.endsWith(normalizedFilter);
    case "doesNotContain":
      return !normalizedValue.includes(normalizedFilter);
    default:
      return true;
  }
};

const matchNumberFilter = (
  value: number | null | undefined,
  operator: FilterOperator,
  filterValue: number
): boolean => {
  if (value === null || value === undefined) return false;

  switch (operator) {
    case "equals":
      return value === filterValue;
    case "greaterThan":
      return value > filterValue;
    case "lessThan":
      return value < filterValue;
    case "greaterThanOrEqual":
      return value >= filterValue;
    case "lessThanOrEqual":
      return value <= filterValue;
    default:
      return true;
  }
};

const matchDateRangeFilter = (
  value: string | null | undefined,
  filterValue: { startDate?: Date | null; endDate?: Date | null }
): boolean => {
  if (!value) return false;

  const dateValue = new Date(value);
  const { startDate, endDate } = filterValue;

  if (startDate && dateValue < startDate) return false;
  if (endDate && dateValue > endDate) return false;

  return true;
};

const matchAmountRangeFilter = (
  value: number | null | undefined,
  filterValue: { min?: number; max?: number }
): boolean => {
  if (value === null || value === undefined) return false;

  const { min, max } = filterValue;

  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;

  return true;
};

const matchSingleSelectFilter = (
  value: string | null | undefined,
  operator: FilterOperator,
  filterValue: string
): boolean => {
  if (value === null || value === undefined) return false;

  switch (operator) {
    case "is":
      return value === filterValue;
    case "isNot":
      return value !== filterValue;
    default:
      return true;
  }
};

const matchMultiSelectFilter = (
  values: string[] | null | undefined,
  operator: FilterOperator,
  filterValues: string[]
): boolean => {
  if (!values || !Array.isArray(values)) return false;
  if (!filterValues || filterValues.length === 0) return true;

  switch (operator) {
    case "in":
      return filterValues.some((fv) => values.includes(fv));
    case "notIn":
      return !filterValues.some((fv) => values.includes(fv));
    default:
      return true;
  }
};

const matchBooleanFilter = (
  value: boolean | null | undefined,
  filterValue: boolean
): boolean => {
  if (value === null || value === undefined) return false;
  return value === filterValue;
};

export const matchesFilter = (
  record: Employee,
  condition: FilterCondition,
  fieldDefinition: FilterFieldDefinition
): boolean => {
  const { field, operator, value } = condition;
  const fieldPath = fieldDefinition.nestedPath || field;
  const recordValue = getNestedValue(
    record as unknown as Record<string, unknown>,
    fieldPath
  );

  if (value === null || value === undefined || value === "") {
    return true;
  }

  switch (fieldDefinition.type) {
    case "text":
      return matchTextFilter(recordValue as string, operator, value as string);

    case "number":
      return matchNumberFilter(
        recordValue as number,
        operator,
        value as number
      );

    case "date":
      const dateFilter = value as {
        startDate?: Date | null;
        endDate?: Date | null;
      };
      if (!dateFilter.startDate && !dateFilter.endDate) return true;
      return matchDateRangeFilter(recordValue as string, dateFilter);

    case "amount":
      const amountFilter = value as { min?: number; max?: number };
      if (amountFilter.min === undefined && amountFilter.max === undefined)
        return true;
      return matchAmountRangeFilter(recordValue as number, amountFilter);

    case "singleSelect":
      return matchSingleSelectFilter(
        recordValue as string,
        operator,
        value as string
      );

    case "multiSelect":
      const multiSelectValue = value as string[];
      if (multiSelectValue.length === 0) return true;
      return matchMultiSelectFilter(
        recordValue as string[],
        operator,
        multiSelectValue
      );

    case "boolean":
      return matchBooleanFilter(recordValue as boolean, value as boolean);

    default:
      return true;
  }
};

export const applyFilters = (
  data: Employee[],
  conditions: FilterCondition[],
  fieldDefinitions: FilterFieldDefinition[]
): Employee[] => {
  if (conditions.length === 0) return data;

  return data.filter((record) => {
    return conditions.every((condition) => {
      const fieldDef = fieldDefinitions.find((f) => f.key === condition.field);
      if (!fieldDef) return true;
      return matchesFilter(record, condition, fieldDef);
    });
  });
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
