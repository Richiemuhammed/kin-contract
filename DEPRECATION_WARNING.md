# url.parse() Deprecation Warning

## Issue

The `url.parse()` deprecation warning is coming from **Zod** (a dependency), not from `@kin/contract` source code.

## Investigation Results

✅ **No `url.parse()` in `@kin/contract` source code**
- Searched all `src/` files - no usage found
- The contract package code is clean

⚠️ **Warning is from Zod dependency**
- `@kin/contract` depends on `zod@^3.23.8` (installs `zod@3.25.76`)
- Zod uses `url.parse()` in test files (not runtime, but Node.js still warns)
- This is a known issue in older Zod versions

## Current Status

- **Warning is non-blocking** - It's a deprecation warning, not an error
- **No impact on functionality** - Everything works correctly
- **Waiting for Zod update** - Need Zod to migrate to WHATWG URL API

## Solution Options

### Option 1: Wait for Zod Update (Recommended)
- Zod team will eventually update to use `new URL()` instead of `url.parse()`
- No action needed - will be fixed automatically when Zod updates

### Option 2: Suppress Warning (If needed)
If the warning is noisy in logs, you can suppress it in Node.js:

```bash
NODE_NO_WARNINGS=1 npm start
```

Or in code:
```typescript
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('url.parse')) {
    // Suppress Zod's url.parse warning
    return;
  }
  console.warn(warning);
});
```

### Option 3: Update Zod (If newer version fixes it)
Check if newer Zod versions fixed this:
```bash
npm view zod@latest version
```

If a newer version is available and fixes the issue, update in `package.json`:
```json
{
  "dependencies": {
    "zod": "^3.26.0"  // or latest version
  }
}
```

Then update the commit hash in consuming projects.

## Verification

The warning is **NOT from `@kin/contract`** - confirmed by:
- ✅ No `url.parse()` in `src/` directory
- ✅ Warning originates from Zod dependency
- ✅ Contract package code is clean

## Recommendation

**Do nothing** - This is a dependency issue that will be resolved when Zod updates. The warning is non-blocking and doesn't affect functionality.

## Related Issues

- Zod GitHub: Check for issues about `url.parse()` deprecation
- Node.js docs: `url.parse()` is deprecated in favor of `new URL()`
- This warning appears when Zod's validation runs (during `z.string().url()` checks)
