# Migration Guide: Backend (kin-backend)

This guide explains how to update the `kin-backend` repository to use the standalone `@kin/contract` package from GitHub.

## Overview

The `@kin/contract` package has been moved to a standalone repository and is now installed via Git instead of a monorepo workspace. This ensures both frontend and backend use the exact same contract version.

## Prerequisites

- Access to the `Richiemuhammed/kin-contract` GitHub repository
- SSH key configured for GitHub (or use HTTPS with personal access token)

## Step 1: Update package.json

Remove the old workspace dependency and add the Git dependency:

**Before:**
```json
{
  "dependencies": {
    "@kin/contract": "workspace:*"
  }
}
```

**After:**
```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git"
  }
}
```

Or if using HTTPS:
```json
{
  "dependencies": {
    "@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git"
  }
}
```

## Step 2: Install Dependencies

Run the installation command:

```bash
npm install
```

The `prepare` script in `@kin/contract` will automatically:
- Install the contract package dependencies
- Build TypeScript to JavaScript
- Generate TypeScript declaration files

This may take a minute on first install.

## Step 3: Verify Installation

Check that the package is installed correctly:

```bash
npm list @kin/contract
```

You should see the package listed with the Git URL.

## Step 4: Test Imports

Verify that your existing imports still work:

```typescript
// These should all work exactly as before
import {
  CreateRequestRequestSchema,
  CreateRequestResponseSchema,
  GetRequestsResponseSchema,
  createSuccessResponse,
  createErrorResponse,
  ErrorCode,
} from '@kin/contract';

import type {
  CreateRequestRequest,
  CreateRequestResponse,
  GetRequestsResponse,
} from '@kin/contract';
```

## Step 5: Update API Route Handlers

Your route handlers should work without changes. Example:

```typescript
import { CreateRequestRequestSchema, ErrorCode, createErrorResponse } from '@kin/contract';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body - works exactly as before
    const validatedData = CreateRequestRequestSchema.parse(body);
    
    // Process request...
    const newRequest = await createRequest(validatedData);
    
    // Return success response
    return Response.json({
      ok: true,
      data: { request: newRequest },
      meta: {
        request_id: crypto.randomUUID(),
        server_time: new Date().toISOString(),
        version: '1.0.0',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        createErrorResponse(
          ErrorCode.VALIDATION_ERROR,
          'Invalid request data',
          error.errors
        ),
        { status: 400 }
      );
    }
    throw error;
  }
}
```

## Step 6: Update CI/CD (if applicable)

If your CI/CD pipeline installs dependencies, ensure it has:

1. **Git access** to the repository (SSH key or HTTPS token)
2. **Full dependency installation** (not `--production` flag, as the package needs devDependencies to build)

Example GitHub Actions:
```yaml
- name: Install dependencies
  run: npm install
  # Don't use: npm ci --production
```

For deployment environments, you may want to:
```yaml
- name: Install dependencies
  run: npm install --production=false
  # Explicitly include devDependencies for contract build
```

## Step 7: Remove Old References (if any)

If you have any references to the old monorepo path, remove them:

- Remove any `packages/@kin/contract` paths
- Remove workspace configuration if this was the only workspace package
- Update any build scripts that referenced the old path

## Step 8: Update OpenAPI Generation (if used)

If you were generating OpenAPI specs from the contract:

```typescript
import { generateOpenAPISpec } from '@kin/contract';

// This still works the same way
const spec = generateOpenAPISpec();
console.log(JSON.stringify(spec, null, 2));
```

## Troubleshooting

### Issue: "Host key verification failed"

**Solution:** Use HTTPS instead of SSH, or configure SSH keys:
```json
"@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git"
```

### Issue: "Cannot find module '@kin/contract'"

**Solution:** 
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check that the `prepare` script ran (look for build output)

### Issue: TypeScript errors after installation

**Solution:**
1. Restart your TypeScript server in your IDE
2. Check that `node_modules/@kin/contract/dist/index.d.ts` exists
3. Verify the package built successfully during install

### Issue: Validation errors in production

**Solution:** Ensure the package is built. In production, you might need:
```bash
npm install --production=false
# or
npm rebuild @kin/contract
```

### Issue: Build takes too long in CI/CD

**Solution:** 
- Cache `node_modules` between builds
- The first install builds the package, subsequent installs are faster
- Consider pre-building and committing the built package (not recommended)

## Version Pinning (Recommended for Production)

To pin to a specific commit for stability:

```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git#commit-hash"
  }
}
```

Or for a tag:
```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git#v1.0.0"
  }
}
```

**Best Practice:** Pin to a specific commit or tag in production to avoid unexpected changes.

## What Changed?

- ✅ **No code changes needed** - All imports work exactly the same
- ✅ **Same schemas and validation** - Everything is identical
- ✅ **Automatic builds** - Package builds on install
- ⚠️ **Installation method** - Now from Git instead of workspace
- ⚠️ **First install slower** - Builds TypeScript on first install
- ⚠️ **Production builds** - May need to ensure devDependencies are available

## Testing Checklist

After migration, verify:

- [ ] All API route handlers import correctly
- [ ] Request validation works (test with invalid data)
- [ ] Response schemas match expected format
- [ ] Error responses use correct ErrorCode enum
- [ ] TypeScript compilation succeeds
- [ ] Runtime validation works (Zod schemas parse correctly)
- [ ] CI/CD pipeline installs and builds successfully

## Need Help?

If you encounter any issues:
1. Check the [contract repository README](../README.md)
2. Verify Git access to the repository
3. Ensure `npm install` completes without errors
4. Check that `node_modules/@kin/contract/dist/` exists after install
5. Verify TypeScript can resolve types from the package
