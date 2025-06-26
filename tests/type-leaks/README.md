# Type Dependencies Test

This test suite validates that packages in the HPCC Visualization Framework monorepo do not reference types from third-party libraries unless those libraries are explicitly declared as dependencies or peerDependencies in their `package.json`.

## Purpose

- **Prevents runtime errors**: Ensures that all external type dependencies are properly declared
- **Improves maintainability**: Makes it clear which external libraries each package depends on
- **Enforces consistency**: Ensures all packages follow the same dependency declaration patterns

## What it checks

1. **TypeScript type files**: Scan `index.d.ts`, `index.node.d.ts`, `index.browser.d.ts` files in each package's `types/` directory
2. **Import statements**: Analyzes `import` and `from` statements to find external dependencies
3. **Type imports**: Specifically looks for type-only imports and type references
4. **Dependency validation**: Checks that referenced packages are in the `dependencies` section of `package.json`

## Exclusions

The test ignores:
- **Built-in Node.js modules**: `fs`, `path`, `util`, etc.
- **TypeScript built-ins**: `typescript`, `@types/node`
- **Internal packages**: All `@hpcc-js/*` packages
- **Relative imports**: Local file imports starting with `./` or `../`
- **Dev dependencies**: Types only used in tests or build scripts

## Running the tests

```bash
# From the root directory
npm run test --workspace tests/type-leaks

# Or directly in the types directory
cd tests/type-leaks
npm test
```

## Example violations

If a package imports from `lodash` but doesn't have it in dependencies:

```typescript
// ❌ Violation - lodash not in dependencies
import { debounce } from 'lodash';

// ✅ Correct - lodash in dependencies section of package.json
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

## Type-only imports

For type-only dependencies, you can use:

```typescript
// Type-only import (still requires dependency declaration)
import type { SomeType } from 'external-library';

// Or in dependencies as a peer dependency for types
{
  "peerDependencies": {
    "external-library": "^1.0.0"
  }
}
```
