# Dynamic Filter Component System (React + TypeScript)

## Tech Stack

1. React
2. TypeScript
3. Mock JSON

## Modern component-driven architecture

A reusable, type-safe dynamic filter builder built with React and TypeScript, designed to integrate seamlessly with any data table.
This project demonstrates clean component architecture, strong typing, extensibility, and real-world client-side filtering logic.

## Features Overview - Dynamic Filter Builder

1. Add multiple filter conditions
2. Select any field/column to filter on
3. Operators dynamically update based on selected field type
4. Context-aware input components (text, number, date, select, etc.)
5. Remove individual filters or clear all filters
6. Filters apply instantly to the table (no page reloads) Component,Responsibility

## Supported Filters

### Text fields

Operators: equals, contains, starts with, ends with, does not contain
Input: simple text input

### Number fields

Operators: equals, greater than, less than, greater than or equal, less than or equal
Input: number input with basic validation

### Date fields

Operator: between
Input: date range picker (from / to)

### Amount / currency fields

Operator: between
Input: min and max amount inputs

### Single select fields

Operators: is, is not
Input: dropdown with predefined options

### Multi select fields

Operators: in, not in
Input: multi-select dropdown with checkboxes

### Boolean fields

Operator: is
Input: checkbox or toggle

## Architecture & Design

This project is intentionally structured to reflect real production code, not a demo toy.

## Key Design Principles

1. Strong type safety across filters, fields, operators, and values
2. Separation of concerns (UI vs logic vs data)
3. Composable & reusable components
4. Extensible field system (new field types can be added easily)
5. Predictable state management

## Table Behavior

1. Sortable columns
2. Nested object rendering handled gracefully
3. Real-time updates as filters change
4. Displays total records count and Filtered records count

5. Shows “No results found” state when applicable
6. Optimized for smooth performance with 50+ records

## Mock API

1. Uses mock-json-api
2. Simulates async data fetching
3. Keeps filtering fully client-side

## Filtering Logic

Filtering is handled completely client-side using a custom filter engine.

## Supported Logic

1. AND between different fields
2. OR within the same field
3. Case-insensitive string matching
4. Numeric comparisons with min/max
5. Date range filtering with proper parsing
6. Multi-select array filtering (IN / NOT IN)
7. Boolean matching
8. Nested object filtering (e.g. address.city)

## Getting Started

-> Install dependencies - npm install

--> Run the app - npm run dev
