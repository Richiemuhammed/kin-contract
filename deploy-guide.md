# Deploy guide — pre-deploy checklist

**Senior dev checklist before deploying `@kin/contract`.**  
This file is **not** included in the published package (see `.npmignore`). Use it locally or in CI; do not ship it.

---

## Before you deploy

- [ ] **Build passes**
  ```bash
  npm run build
  ```

- [ ] **OpenAPI spec generates**
  ```bash
  npm run generate:openapi
  ```

- [ ] **Contract version**
  - Bump `version` in `package.json` if this release has breaking or notable changes.
  - Update `changelog.md` with what changed.

- [ ] **Consumers aligned**
  - `kin-backend` and `kin` (frontend) pin `@kin/contract` via Git (commit hash) or version.
  - Confirm they’re updated to use the new contract **before** you deploy backend/frontend, or lock the contract commit they use.

- [ ] **No secrets**
  - No `.env`, tokens, or keys in committed files.
  - `deploy-key-to-paste.md` and similar are not committed or are gitignored.

- [ ] **Git state**
  - All intended changes committed.
  - Branch is the one you deploy from (e.g. `main`).

---

## Deploy steps (typical)

1. Run the checklist above.
2. Push to your deploy branch (e.g. `main`):
   ```bash
   git push origin main
   ```
3. If you use tags for releases:
   ```bash
   git tag -a v1.0.2 -m "Release 1.0.2" && git push origin v1.0.2
   ```
4. Consumers install via Git; update their `package.json` commit ref if you cut a new release.

---

## After deploy

- [ ] Verify `kin-backend` (and any other consumers) can `npm install` the contract.
- [ ] Smoke-check one backend and one frontend flow that use the updated contract.
