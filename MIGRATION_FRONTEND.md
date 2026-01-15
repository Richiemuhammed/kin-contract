# Migration Guide: Frontend (kin)

This guide explains how to update the `kin` frontend repository to use the standalone `@kin/contract` package from GitHub.

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

**After (pinned to specific commit - RECOMMENDED):**
```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

Or if using HTTPS:
```json
{
  "dependencies": {
    "@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

**Note:** The commit hash (`8d7772a...`) pins to v1.0.1 which includes the OpenAPI dependency fix. Always pin to a specific commit in production to avoid silent changes.

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
import type {
  Request,
  RequestWithKin,
  CreateRequestRequest,
  CreateRequestResponse,
  GetRequestsResponse,
} from '@kin/contract';

import {
  CreateRequestRequestSchema,
  CreateRequestResponseSchema,
  GetRequestsResponseSchema,
  createSuccessResponse,
  createErrorResponse,
  ErrorCode,
  safeParseResponse,
} from '@kin/contract';
```

## Step 5: Update CI/CD (if applicable)

If your CI/CD pipeline installs dependencies, ensure it has:

1. **Git access** to the repository (SSH key or HTTPS token)
2. **Full dependency installation** (not `--production` flag, as the package needs devDependencies to build)

Example GitHub Actions:
```yaml
- name: Install dependencies
  run: npm install
  # Don't use: npm ci --production
```

## Step 6: Remove Old References (if any)

If you have any references to the old monorepo path, remove them:

- Remove any `packages/@kin/contract` paths
- Remove workspace configuration if this was the only workspace package
- Update any build scripts that referenced the old path

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

### Issue: Build takes too long

**Solution:** The first install builds the package. Subsequent installs are faster. You can also:
- Use `npm install --ignore-scripts` to skip the build (not recommended)
- Pre-build the package in your CI/CD and cache it

## Version Pinning (REQUIRED for Production)

**Always pin to a specific commit hash** to ensure reproducible builds and avoid silent contract changes.

Current recommended commit (v1.0.1 with OpenAPI fix):
```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

To get the latest commit hash:
```bash
git ls-remote https://github.com/Richiemuhammed/kin-contract.git HEAD | cut -f1
```

**Why pin?**
- ✅ Reproducible builds (same code every time)
- ✅ No silent contract changes on reinstall
- ✅ Safer releases (explicit version control)
- ✅ Easier debugging (know exactly which version you're using)

## What Changed?

- ✅ **No code changes needed** - All imports work exactly the same
- ✅ **Same types and schemas** - Everything is identical
- ✅ **Automatic builds** - Package builds on install
- ⚠️ **Installation method** - Now from Git instead of workspace
- ⚠️ **First install slower** - Builds TypeScript on first install

## Need Help?

If you encounter any issues:
1. Check the [contract repository README](../README.md)
2. Verify Git access to the repository
3. Ensure `npm install` completes without errors
4. Check that `node_modules/@kin/contract/dist/` exists after install
