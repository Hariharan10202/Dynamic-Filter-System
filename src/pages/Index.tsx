import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { FunnelPlus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "../components/DataTable";
import { FilterBuilder } from "../components/filters";
import { employeeFilterFields } from "../config/filterFields";
import { mockEmployees } from "../data/mockEmployees";
import type { Employee } from "../types/employee.types";
import type { FilterCondition } from "../types/filter.types";
import { applyFilters } from "../utils/filterUtils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Index: React.FC = () => {
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>(
    []
  );
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200));
      setEmployees(mockEmployees);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredEmployees = useMemo(() => {
    return applyFilters(employees, filterConditions, employeeFilterFields);
  }, [employees, filterConditions]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          pb: 6,
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            py: 3,
            mb: 4,
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FunnelPlus />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                  }}
                >
                  Edstruments - Dynamic Filter System
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <FilterBuilder
              conditions={filterConditions}
              fieldDefinitions={employeeFilterFields}
              onConditionsChange={setFilterConditions}
            />

            {loading ? (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  backgroundColor: "background.paper",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Loading employee data...
                </Typography>
              </Box>
            ) : (
              // We can replace any table here. filters works seamlessly
              <DataTable data={filteredEmployees} />
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
