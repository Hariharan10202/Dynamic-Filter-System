// This file is written with the help of AI.

import {
  CITIES,
  DEPARTMENTS,
  ROLES,
  SKILLS,
  type Employee,
} from "../types/employee.types";

const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomElements = <T>(arr: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDecimal = (
  min: number,
  max: number,
  decimals: number = 1
): number => Number((Math.random() * (max - min) + min).toFixed(decimals));

const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Emily",
  "David",
  "Sarah",
  "James",
  "Emma",
  "Robert",
  "Olivia",
  "William",
  "Sophia",
  "Joseph",
  "Isabella",
  "Charles",
  "Mia",
  "Thomas",
  "Charlotte",
  "Daniel",
  "Amelia",
  "Matthew",
  "Harper",
  "Anthony",
  "Evelyn",
  "Andrew",
  "Abigail",
  "Joshua",
  "Ella",
  "Christopher",
  "Avery",
  "Kevin",
  "Sofia",
  "Brian",
  "Camila",
  "Ryan",
  "Victoria",
  "Nicholas",
  "Luna",
  "Tyler",
  "Grace",
  "Brandon",
  "Chloe",
  "Justin",
  "Penelope",
  "Aaron",
  "Layla",
  "Jonathan",
  "Riley",
  "Stephen",
  "Zoey",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
];

const generateEmployees = (): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 1; i <= 60; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
    const department = getRandomElement(DEPARTMENTS);
    const role = getRandomElement(ROLES);
    const location = getRandomElement(CITIES);

    let baseSalary = 50000;
    if (role.includes("Senior") || role.includes("Lead")) baseSalary = 90000;
    if (
      role.includes("Staff") ||
      role.includes("Principal") ||
      role.includes("Manager")
    )
      baseSalary = 120000;
    if (role.includes("Director")) baseSalary = 150000;
    const salary = baseSalary + getRandomNumber(-10000, 30000);

    const joinDate = getRandomDate(
      new Date("2023-01-01"),
      new Date("2024-01-01")
    );
    const lastReview = getRandomDate(
      new Date("2025-01-01"),
      new Date("2026-01-10")
    );

    employees.push({
      id: i,
      name,
      email,
      department,
      role,
      salary,
      joinDate,
      isActive: Math.random() > 0.15,
      skills: getRandomElements(SKILLS, 2, 6),
      address: {
        city: location.city,
        state: location.state,
        country: location.country,
      },
      projects: getRandomNumber(0, 8),
      lastReview,
      performanceRating: getRandomDecimal(2.5, 5.0, 1),
    });
  }

  return employees;
};

export const mockEmployees: Employee[] = generateEmployees();

export const fetchEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees);
    }, 300);
  });
};
