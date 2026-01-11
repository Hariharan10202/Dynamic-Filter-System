import { CITIES, DEPARTMENTS, ROLES, SKILLS } from "../types/employee.types";
import type { FilterFieldDefinition } from "../types/filter.types";

export const employeeFilterFields: FilterFieldDefinition[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
  },
  {
    key: "email",
    label: "Email",
    type: "text",
  },
  {
    key: "department",
    label: "Department",
    type: "singleSelect",
    options: DEPARTMENTS.map((d) => ({ value: d, label: d })),
  },
  {
    key: "role",
    label: "Role",
    type: "singleSelect",
    options: ROLES.map((r) => ({ value: r, label: r })),
  },
  {
    key: "salary",
    label: "Salary",
    type: "amount",
  },
  {
    key: "joinDate",
    label: "Join Date",
    type: "date",
  },
  {
    key: "isActive",
    label: "Active Status",
    type: "boolean",
  },
  {
    key: "skills",
    label: "Skills",
    type: "multiSelect",
    options: SKILLS.map((s) => ({ value: s, label: s })),
  },
  {
    key: "address.city",
    label: "City",
    type: "singleSelect",
    nestedPath: "address.city",
    options: [...new Set(CITIES.map((c) => c.city))].map((city) => ({
      value: city,
      label: city,
    })),
  },
  {
    key: "address.country",
    label: "Country",
    type: "singleSelect",
    nestedPath: "address.country",
    options: [...new Set(CITIES.map((c) => c.country))].map((country) => ({
      value: country,
      label: country,
    })),
  },
  {
    key: "projects",
    label: "Projects",
    type: "number",
  },
  {
    key: "performanceRating",
    label: "Performance Rating",
    type: "number",
  },
  {
    key: "lastReview",
    label: "Last Review Date",
    type: "date",
  },
];

export const getFieldDefinition = (
  key: string
): FilterFieldDefinition | undefined => {
  return employeeFilterFields.find((f) => f.key === key);
};
