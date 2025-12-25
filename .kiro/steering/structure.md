# Project Structure

## Directory Organization

```
src/
├── base/                    # Core framework classes
│   ├── base.ts             # Abstract base class for all pages/steps
│   ├── base-page.ts        # Page Object Model base class
│   ├── base-step.ts        # BDD step definitions base class
│   ├── browser-factory.ts  # Browser instance creation
│   ├── driver-context.ts   # Browser/page context management
│   ├── test-initialize-hook.ts  # Test initialization
│   └── index.ts            # Exports
├── config/                  # Configuration management
│   ├── config-reader.ts    # Environment config reader
│   ├── settings.ts         # Global settings class
│   └── index.ts            # Exports
├── helpers/                 # Utility functions
│   ├── logger.ts           # Logging utility
│   └── index.ts            # Exports
├── types/                   # TypeScript type definitions
│   └── index.ts            # Enums and interfaces
└── index.ts                # Main entry point (public API)

dist/                       # Compiled output (generated)
logs/                       # Test execution logs (generated)
screenshots/                # Test failure screenshots (generated)
```

## Key Modules

### base/
Foundation classes that all page objects and step definitions extend. Provides common functionality for browser interaction, element handling, and logging.

### config/
Manages application configuration through environment variables and the Settings class. Centralized configuration for timeouts, URLs, browser types, and execution modes.

### helpers/
Utility functions including the Logger class for file and console logging with timestamps.

### types/
TypeScript enums and interfaces defining the framework's type system (BrowserType, ExecutionType, TestType, etc.).

## Naming Conventions

- **Files**: kebab-case (e.g., `base-page.ts`, `driver-context.ts`)
- **Classes**: PascalCase (e.g., `BasePage`, `DriverContext`)
- **Methods/Properties**: camelCase (e.g., `navigateTo()`, `fillText()`)
- **Constants/Enums**: PascalCase (e.g., `BrowserType`, `LogLevel`)
- **Private members**: Prefix with underscore (e.g., `_logFilePath`)

## Import Paths

TypeScript path aliases are configured in `tsconfig.json`:
- `@base/*` → `src/base/*`
- `@config/*` → `src/config/*`
- `@helpers/*` → `src/helpers/*`
- `@pages/*` → `src/pages/*` (for user-defined pages)
- `@steps/*` → `src/steps/*` (for user-defined steps)
- `@types/*` → `src/types/*`

## Code Organization Principles

1. **Separation of Concerns**: Each module has a single responsibility
2. **Inheritance Hierarchy**: Pages extend BasePage, Steps extend BaseStep, both extend Base
3. **Encapsulation**: Protected methods in base classes, public API through exports
4. **Type Safety**: All public APIs have explicit type annotations
5. **Documentation**: JSDoc comments on all public methods and classes
