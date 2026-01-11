export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  skills: string[];
  address: Address;
  projects: number;
  lastReview: string;
  performanceRating: number;
}

export const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Customer Support",
  "Legal",
];

export const ROLES = [
  "Junior Developer",
  "Senior Developer",
  "Lead Developer",
  "Staff Engineer",
  "Principal Engineer",
  "Designer",
  "Senior Designer",
  "Lead Designer",
  "Product Manager",
  "Senior Product Manager",
  "Marketing Specialist",
  "Marketing Manager",
  "Sales Representative",
  "Account Executive",
  "HR Specialist",
  "HR Manager",
  "Financial Analyst",
  "Operations Manager",
  "Support Engineer",
  "Legal Counsel",
];

export const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "Python",
  "Java",
  "AWS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Figma",
  "Sketch",
  "Adobe XD",
  "JavaScript",
  "Vue.js",
  "Angular",
  "Go",
  "Rust",
  "Machine Learning",
  "Data Analysis",
  "Project Management",
  "Agile",
  "Scrum",
];

export const CITIES = [
  { city: "San Francisco", state: "CA", country: "USA" },
  { city: "New York", state: "NY", country: "USA" },
  { city: "Los Angeles", state: "CA", country: "USA" },
  { city: "Seattle", state: "WA", country: "USA" },
  { city: "Austin", state: "TX", country: "USA" },
  { city: "Boston", state: "MA", country: "USA" },
  { city: "Chicago", state: "IL", country: "USA" },
  { city: "Denver", state: "CO", country: "USA" },
  { city: "Miami", state: "FL", country: "USA" },
  { city: "Portland", state: "OR", country: "USA" },
  { city: "London", state: "England", country: "UK" },
  { city: "Berlin", state: "Berlin", country: "Germany" },
  { city: "Toronto", state: "Ontario", country: "Canada" },
  { city: "Sydney", state: "NSW", country: "Australia" },
  { city: "Singapore", state: "Singapore", country: "Singapore" },
];
