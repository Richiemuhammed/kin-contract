# What To Do Next - Action Guide

This guide provides a clear roadmap for completing the `@kin/contract` package setup and migration.

## ✅ What's Already Done

1. **Contract Package Setup**
   - ✅ Standalone `kin-contract` repository created
   - ✅ Package builds to `dist/` with TypeScript declarations
   - ✅ OpenAPI dependency fixed (moved to `dependencies`)
   - ✅ Version 1.0.1 released and pinned
   - ✅ All documentation created

2. **Backend Migration**
   - ✅ `kin-backend` updated to use contract package
   - ✅ Pinned to commit `8d7772a...`
   - ✅ Workaround dependencies removed
   - ✅ Verified installation works

## 🎯 What To Do Next

### Step 1: Migrate Frontend (kin)

**Priority: HIGH**

1. **Update `kin/package.json`:**
   ```json
   {
     "dependencies": {
       "@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
     }
   }
   ```

2. **Remove old workspace dependency:**
   - Remove `"@kin/contract": "workspace:*"` if it exists
   - Remove workspace configuration if this was the only workspace package

3. **Install:**
   ```bash
   cd kin
   npm install
   ```

4. **Verify:**
   ```bash
   npm list @kin/contract
   # Should show version 1.0.1
   ```

5. **Test imports:**
   ```typescript
   import type { CreateRequestRequest, CreateRequestResponse } from '@kin/contract';
   import { CreateRequestRequestSchema, ErrorCode } from '@kin/contract';
   ```

6. **Update CI/CD (if applicable):**
   - Ensure CI has access to GitHub (HTTPS with token or SSH key)
   - Don't use `--production` flag (package needs devDependencies to build)

**📖 Detailed guide:** See [MIGRATION_FRONTEND.md](./MIGRATION_FRONTEND.md)

---

### Step 2: Enforce Contract in Backend Routes

**Priority: HIGH**

Ensure all backend API routes use contract schemas for validation:

1. **Request Validation:**
   ```typescript
   import { CreateRequestRequestSchema, ErrorCode, createErrorResponse } from '@kin/contract';
   
   const validatedData = CreateRequestRequestSchema.parse(body);
   ```

2. **Response Format:**
   ```typescript
   import { createSuccessResponse, createErrorResponse } from '@kin/contract';
   
   return Response.json(createSuccessResponse(data, meta));
   ```

3. **Error Handling:**
   ```typescript
   return Response.json(
     createErrorResponse(ErrorCode.VALIDATION_ERROR, 'Invalid data', errors),
     { status: 400 }
   );
   ```

4. **Check all routes:**
   - `/api/asks` (requests)
   - `/api/payouts`
   - `/api/kin-members`
   - `/api/ledger`
   - `/api/balance`
   - `/api/subscription`
   - `/api/overview`
   - `/api/me` (auth)

**Goal:** Every route should use contract schemas for type safety and validation.

---

### Step 3: Add Contract Validation Tests

**Priority: MEDIUM**

Create tests to ensure backend responses match contract:

```typescript
// tests/contract-compliance.test.ts
import { GetRequestsResponseSchema } from '@kin/contract';

test('GET /api/asks matches contract', async () => {
  const response = await fetch('/api/asks');
  const json = await response.json();
  
  // Should not throw if response matches contract
  expect(() => GetRequestsResponseSchema.parse(json)).not.toThrow();
});
```

---

### Step 4: Update Contract Version Strategy

**Priority: MEDIUM**

**Current:** Pinned to specific commit hash

**When to update:**
1. Make changes to contract schemas
2. Commit changes to `kin-contract` repo
3. Get new commit hash: `git rev-parse HEAD`
4. Update both `kin` and `kin-backend` to new hash
5. Test thoroughly before deploying

**Best Practice:**
- Create a tag for each version: `git tag v1.0.1`
- Use tags in production: `#v1.0.1` instead of commit hash
- Document breaking changes in `CHANGELOG.md`

---

### Step 5: Set Up CI/CD Contract Validation

**Priority: LOW (but valuable)**

Add contract validation to CI/CD pipelines:

**Frontend CI:**
- Validate API responses match contract schemas
- Fail build if contract is violated

**Backend CI:**
- Ensure all routes use contract schemas
- Validate response formats match contract
- Run contract compliance tests

---

## 📋 Quick Checklist

### Frontend (kin)
- [ ] Update `package.json` with contract dependency
- [ ] Remove old workspace dependency
- [ ] Run `npm install`
- [ ] Verify package installs correctly
- [ ] Test imports work
- [ ] Update CI/CD if needed
- [ ] Test API calls with contract types

### Backend (kin-backend)
- [x] Update `package.json` with contract dependency
- [x] Remove workaround dependencies
- [x] Verify installation
- [ ] Enforce contract in all routes
- [ ] Add contract validation tests
- [ ] Update CI/CD to validate contract compliance

### Contract Package (kin-contract)
- [x] Package builds correctly
- [x] Dependencies fixed
- [x] Documentation complete
- [x] Version pinned
- [ ] Set up version tags (optional)
- [ ] Add more examples (optional)

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module '@kin/contract'"
**Solution:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check that `node_modules/@kin/contract/dist/` exists

### Issue: TypeScript errors after install
**Solution:**
1. Restart TypeScript server in IDE
2. Verify `dist/index.d.ts` exists
3. Check package built during install

### Issue: "no public SSH keys"
**Solution:** Use HTTPS instead:
```json
"@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git#8d7772a..."
```

### Issue: Build fails in CI/CD
**Solution:**
- Ensure CI has GitHub access (token or SSH key)
- Don't use `npm install --production` (needs devDependencies)
- Check that `prepare` script runs successfully

---

## 📚 Reference Documents

- **[QUICK_START.md](./QUICK_START.md)** - Quick copy-paste dependency
- **[MIGRATION_FRONTEND.md](./MIGRATION_FRONTEND.md)** - Detailed frontend migration
- **[MIGRATION_BACKEND.md](./MIGRATION_BACKEND.md)** - Detailed backend migration
- **[README.md](./README.md)** - Full package documentation
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

---

## 🎯 Current Status

| Task | Status | Priority |
|------|--------|----------|
| Contract package setup | ✅ Done | - |
| Backend migration | ✅ Done | - |
| Frontend migration | ⏳ Next | HIGH |
| Contract enforcement | ⏳ Next | HIGH |
| Contract tests | ⏳ Pending | MEDIUM |
| CI/CD validation | ⏳ Pending | LOW |

---

## 💡 Pro Tips

1. **Always pin to commit hash** - Prevents silent contract changes
2. **Test after every contract update** - Ensure nothing breaks
3. **Use contract types everywhere** - Maximize type safety
4. **Validate at runtime** - Use Zod schemas for runtime validation
5. **Document breaking changes** - Update CHANGELOG.md

---

## 🆘 Need Help?

1. Check the troubleshooting sections in migration guides
2. Verify Git access to the repository
3. Ensure `npm install` completes without errors
4. Check that `node_modules/@kin/contract/dist/` exists
5. Review the [README.md](./README.md) for usage examples

---

**Last Updated:** 2025-01-15  
**Current Contract Version:** 1.0.1  
**Pinned Commit:** `8d7772a527eb89e68d7811da92ae872b307f3874`
