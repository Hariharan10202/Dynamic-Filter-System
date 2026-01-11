import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import type { Employee } from "../types/employee.types";
import { formatCurrency, formatDate } from "../utils/filterUtils";

interface HeadCell {
  id: keyof Employee | "address.city";
  label: string;
  numeric: boolean;
  sortable: boolean;
}

type Order = "asc" | "desc";

const headCells: HeadCell[] = [
  { id: "name", label: "Name", numeric: false, sortable: true },
  { id: "department", label: "Department", numeric: false, sortable: true },
  { id: "role", label: "Role", numeric: false, sortable: true },
  { id: "salary", label: "Salary", numeric: true, sortable: true },
  { id: "address.city", label: "City", numeric: false, sortable: true },
  { id: "joinDate", label: "Join Date", numeric: false, sortable: true },
  {
    id: "lastReview",
    label: "Last Review",
    numeric: false,
    sortable: true,
  },
  { id: "projects", label: "Projects", numeric: true, sortable: true },
  { id: "performanceRating", label: "Rating", numeric: true, sortable: true },
  { id: "skills", label: "Skills", numeric: false, sortable: false },
  { id: "isActive", label: "Status", numeric: false, sortable: true },
];

interface DataTableProps {
  data: Employee[];
}

const getNestedValue = (
  obj: Employee,
  path: string
): string | number | boolean | string[] => {
  if (path.includes(".")) {
    const keys = path.split(".");
    let value: unknown = obj;
    for (const key of keys) {
      value = (value as Record<string, unknown>)?.[key];
    }
    return value as string;
  }
  return obj[path as keyof Employee] as string | number | boolean | string[];
};

const getComparator = <Key extends keyof Employee | "address.city">(
  order: Order,
  orderBy: Key
): ((a: Employee, b: Employee) => number) => {
  return (a, b) => {
    const aValue = getNestedValue(a, orderBy);
    const bValue = getNestedValue(b, orderBy);

    if (Array.isArray(aValue) || Array.isArray(bValue)) {
      return 0;
    }

    if (bValue < aValue) {
      return order === "desc" ? -1 : 1;
    }
    if (bValue > aValue) {
      return order === "desc" ? 1 : -1;
    }
    return 0;
  };
};

export const DataTable = ({ data }: DataTableProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Employee | "address.city">(
    "name"
  );
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleRequestSort = (property: keyof Employee | "address.city") => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    return [...data].sort(getComparator(order, orderBy));
  }, [data, order, orderBy]);

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Department",
      "Role",
      "Salary",
      "City",
      "Join Date",
      "Last Review",
      "Projects",
      "Performance Rating",
      "Skills",
      "Status",
    ];

    const csvData = sortedData.map((row) => [
      row.name,
      row.email,
      row.department,
      row.role,
      row.salary,
      row.address.city,
      formatDate(row.joinDate),
      formatDate(row.lastReview),
      row.projects,
      row.performanceRating,
      row.skills.join("; "),
      row.isActive ? "Active" : "Inactive",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `employees_export_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleExportClose();
  };

  const exportToJSON = () => {
    const jsonData = sortedData.map((row) => ({
      name: row.name,
      email: row.email,
      department: row.department,
      role: row.role,
      salary: row.salary,
      city: row.address.city,
      joinDate: row.joinDate,
      lastReview: row.lastReview,
      projects: row.projects,
      performanceRating: row.performanceRating,
      skills: row.skills,
      isActive: row.isActive,
    }));

    const jsonContent = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `employees_export_${Date.now()}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleExportClose();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          backgroundColor: "rgba(129, 140, 248, 0.05)",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: 500 }}
        >
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            {data.length}
          </Box>{" "}
          Employees found
        </Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Download size={16} />}
          onClick={handleExportClick}
          sx={{
            textTransform: "none",
            borderColor: "divider",
            color: "text.primary",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "rgba(129, 140, 248, 0.08)",
            },
          }}
        >
          Export
        </Button>

        <Menu
          anchorEl={exportAnchorEl}
          open={Boolean(exportAnchorEl)}
          onClose={handleExportClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem sx={{ fontSize: "14px" }} onClick={exportToCSV}>
            Export as CSV
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} onClick={exportToJSON}>
            Export as JSON
          </MenuItem>
        </Menu>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{
                    backgroundColor: "background.paper",
                    fontWeight: 600,
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "2px solid",
                    borderColor: "divider",
                    whiteSpace: "nowrap",
                  }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                      sx={{
                        "&.Mui-active": {
                          color: "primary.main",
                        },
                        "&.Mui-active .MuiTableSortLabel-icon": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={headCells.length}
                  sx={{ textAlign: "center", py: 8 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "text.secondary", fontWeight: 500 }}
                  >
                    No results found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    transition: "background-color 0.15s",
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "text.primary" }}
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.disabled" }}
                        >
                          {row.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.department}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(129, 140, 248, 0.15)",
                        color: "primary.light",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {row.role}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {formatCurrency(row.salary)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {row.address.city}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                    >
                      {formatDate(row.joinDate)}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                    >
                      {formatDate(row.lastReview)}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontWeight: 500 }}
                    >
                      {row.projects}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        backgroundColor:
                          row.performanceRating >= 4
                            ? "rgba(34, 197, 94, 0.15)"
                            : row.performanceRating >= 3
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color:
                            row.performanceRating >= 4
                              ? "success.main"
                              : row.performanceRating >= 3
                              ? "warning.main"
                              : "error.main",
                        }}
                      >
                        {row.performanceRating.toFixed(1)}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {row.skills.slice(0, 2).map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(129, 140, 248, 0.2)",
                            color: "primary.light",
                            fontSize: "0.7rem",
                            height: "22px",
                          }}
                        />
                      ))}
                      {row.skills.length > 2 && (
                        <Chip
                          label={`+${row.skills.length - 2}`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "text.secondary",
                            fontSize: "0.7rem",
                            height: "22px",
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      {row.isActive ? (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "black",
                            backgroundColor: "success.main",
                            fontWeight: 500,
                            paddingX: "10px",
                            paddingY: "2px",
                            borderRadius: 3,
                            fontSize: 14,
                          }}
                        >
                          Active
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            color: "black",
                            backgroundColor: "error.main",
                            fontWeight: 500,
                            paddingX: "10px",
                            paddingY: "2px",
                            borderRadius: 3,
                            fontSize: 14,
                          }}
                        >
                          Inactive
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
