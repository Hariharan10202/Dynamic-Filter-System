export type FieldType =
  | "text"
  | "number"
  | "date"
  | "amount"
  | "singleSelect"
  | "multiSelect"
  | "boolean";

export type TextOperator =
  | "equals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "doesNotContain";
export type NumberOperator =
  | "equals"
  | "greaterThan"
  | "lessThan"
  | "greaterThanOrEqual"
  | "lessThanOrEqual";
export type DateOperator = "between";
export type AmountOperator = "between";
export type SingleSelectOperator = "is" | "isNot";
export type MultiSelectOperator = "in" | "notIn";
export type BooleanOperator = "is";

export type FilterOperator =
  | TextOperator
  | NumberOperator
  | DateOperator
  | AmountOperator
  | SingleSelectOperator
  | MultiSelectOperator
  | BooleanOperator;

export const OPERATORS_BY_TYPE: Record<
  FieldType,
  { value: FilterOperator; label: string }[]
> = {
  text: [
    { value: "equals", label: "Equals" },
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts With" },
    { value: "endsWith", label: "Ends With" },
    { value: "doesNotContain", label: "Does Not Contain" },
  ],
  number: [
    { value: "equals", label: "Equals" },
    { value: "greaterThan", label: "Greater Than" },
    { value: "lessThan", label: "Less Than" },
    { value: "greaterThanOrEqual", label: "Greater Than or Equal" },
    { value: "lessThanOrEqual", label: "Less Than or Equal" },
  ],
  date: [{ value: "between", label: "Between" }],
  amount: [{ value: "between", label: "Between" }],
  singleSelect: [
    { value: "is", label: "Is" },
    { value: "isNot", label: "Is Not" },
  ],
  multiSelect: [
    { value: "in", label: "In" },
    { value: "notIn", label: "Not In" },
  ],
  boolean: [{ value: "is", label: "Is" }],
};

export interface FilterFieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  nestedPath?: string;
}

export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | { min?: number; max?: number }
  | { startDate?: Date | null; endDate?: Date | null }
  | null;

export interface FilterCondition {
  id: string;
  field: string;
  operator: FilterOperator;
  value: FilterValue;
}

export interface FilterState {
  conditions: FilterCondition[];
}

export const generateFilterId = (): string => {
  return `filter_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const getDefaultValue = (type: FieldType): FilterValue => {
  switch (type) {
    case "text":
      return "";
    case "number":
      return 0;
    case "date":
      return { startDate: null, endDate: null };
    case "amount":
      return { min: undefined, max: undefined };
    case "singleSelect":
      return "";
    case "multiSelect":
      return [];
    case "boolean":
      return true;
    default:
      return null;
  }
};

export const getDefaultOperator = (type: FieldType): FilterOperator => {
  return OPERATORS_BY_TYPE[type][0].value;
};
