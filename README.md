# 🤖 AI-Powered SQL Generator

A modern, intelligent web application that transforms natural language queries into SQL statements using AI. Built with React, TypeScript, and a beautiful UI powered by shadcn/ui components.

![AI SQL Generator](https://img.shields.io/badge/AI-Powered-SQL%20Generator-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **🧠 Natural Language Processing**: Convert plain English questions into SQL queries
- **🎨 Modern UI/UX**: Beautiful, responsive interface built with shadcn/ui components
- **📊 Real-time Results**: View generated SQL and execute queries with mock data
- **📝 SQL Editor**: Edit and customize generated SQL queries
- **📚 Query History**: Track and reuse previous queries
- **🗄️ Database Schema Viewer**: Visual representation of database structure
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎯 Sample Queries**: Pre-built examples to get you started quickly

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons

### State Management & Data Fetching
- **TanStack Query** - Powerful data fetching and caching
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Routing & Navigation
- **React Router DOM** - Client-side routing
- **React Resizable Panels** - Resizable layout components

### UI/UX Enhancements
- **Sonner** - Beautiful toast notifications
- **Recharts** - Composable charting library
- **Embla Carousel** - Lightweight carousel component
- **Date-fns** - Modern date utility library

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishnusankar2203/AI-Powered-SQL-Generator.git
   cd AI-Powered-SQL-Generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📖 Usage Guide

### 1. Natural Language Query Input
- Type your question in plain English in the query input field
- Examples:
  - "Show me all customers from Chennai"
  - "Count total orders from last month"
  - "What are the top selling products?"

### 2. View Generated SQL
- The AI will generate SQL based on your natural language query
- Review the generated SQL in the SQL display panel
- Click "Edit SQL" to customize the query if needed

### 3. Execute Queries
- Click "Run SQL" to execute the query with mock data
- View results in the interactive data table
- Export or copy results as needed

### 4. Explore Database Schema
- Use the left sidebar to view the database structure
- Understand table relationships and column types
- Reference schema while writing queries

### 5. Query History
- Access your previous queries from the history panel
- Click on any historical query to re-run it
- Track your query patterns and improvements

## 🏗️ Project Structure

```
AI-Powered-SQL-Generator/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── DatabaseSchema.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── QueryInput.tsx
│   │   ├── ResultsTable.tsx
│   │   └── SQLDisplay.tsx
│   ├── config/            # Configuration files
│   ├── constants/         # Application constants
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎯 Sample Queries

Try these example queries to get started:

- **Customer Analysis**: "Show me all customers from Chennai"
- **Sales Reports**: "Count total orders from last month"
- **Product Insights**: "What are the top selling products?"
- **Inventory Management**: "List products with low inventory"
- **Regional Analysis**: "Show sales by region"
- **Customer Retention**: "Find customers who haven't ordered recently"

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.ts` for theme customization
- Updating component styles in individual component files
- Adding custom CSS in `src/index.css`

### Database Schema
Update the sample database schema in `src/constants/index.ts`:
```typescript
export const SAMPLE_DATABASE_SCHEMA: DatabaseSchema = {
  // Add your tables and columns here
};
```

### Sample Queries
Add more sample queries in `src/constants/index.ts`:
```typescript
export const SAMPLE_QUERIES = [
  // Add your custom queries here
];
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Ensure all tests pass
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/vishnusankar2203">Vishnu Sankar</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
