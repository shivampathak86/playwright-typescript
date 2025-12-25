# Technology Stack

## Core Technologies
- **TypeScript 5.3+**: Primary language with strict type checking enabled
- **Playwright 1.40+**: Cross-browser automation library (peer dependency)
- **Node.js**: Runtime environment

## Build & Development Tools
- **TypeScript Compiler (tsc)**: Compiles TypeScript to JavaScript
- **ESLint 8.54+**: Code linting with TypeScript support
- **Prettier 3.1+**: Code formatting
- **npm**: Package manager

## Dependencies
- **dotenv 16.3+**: Environment variable management
- **winston 3.11+**: Logging library

## Development Dependencies
- **@playwright/test 1.40+**: Playwright testing framework
- **@types/node 20.10+**: Node.js type definitions
- **@typescript-eslint/eslint-plugin & parser 6.13+**: TypeScript linting

## Build Commands

### Compile TypeScript
```bash
npm run build
```
Compiles `src/**/*.ts` to `dist/` with source maps and declaration files.

### Code Quality
```bash
npm run lint          # Run ESLint on src
npm run format        # Format code with Prettier
```

### Testing
```bash
npm test              # Run Playwright tests (headless)
npm run test:headed   # Run tests with browser visible
npm run test:debug    # Run tests in debug mode
```

### Cleanup
```bash
npm run clean         # Remove dist directory
```

### Publishing
```bash
npm run prepublishOnly  # Automatically runs build before publish
```

## Configuration Files
- **tsconfig.json**: TypeScript compiler configuration with path aliases
- **package.json**: Project metadata and scripts
- **.env**: Environment variables (BASE_URL, ENVIRONMENT, etc.)

## Output
- **dist/**: Compiled JavaScript and type definitions
- **logs/**: Test execution logs (created at runtime)
- **screenshots/**: Test failure screenshots (created at runtime)
