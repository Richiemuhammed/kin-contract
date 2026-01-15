# Quick Start Guide

## For Frontend (kin)

**Recommended: HTTPS** (works immediately, no setup needed)
```json
{
  "dependencies": {
    "@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

**Alternative: SSH** (requires SSH key setup)
```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

Then:
```bash
npm install
```

## For Backend (kin-backend)

**Recommended: HTTPS** (works immediately, no setup needed)
```json
{
  "dependencies": {
    "@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

**Alternative: SSH** (requires SSH key setup)
```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

Then:
```bash
npm install
```

## Current Version

- **Version:** 1.0.1
- **Commit:** `8d7772a527eb89e68d7811da92ae872b307f3874`
- **Status:** ✅ Production-ready with OpenAPI dependency fix

## What's Included

- ✅ All Zod schemas and TypeScript types
- ✅ Request/response validation
- ✅ Error handling utilities
- ✅ OpenAPI generation (no extra dependencies needed)
- ✅ Auto-builds on install

## Next Steps

1. **Frontend:** Update `package.json` and install (see migration-frontend.md)
2. **Backend:** ✅ Already done!
3. **Both:** Start using contract types and schemas in your code

## SSH vs HTTPS

**HTTPS (Recommended):**
- ✅ Works immediately, no setup needed
- ✅ Works in CI/CD with personal access tokens
- ✅ No SSH key configuration required
- ⚠️ May prompt for GitHub credentials (use personal access token)

**SSH (Alternative):**
- ✅ No credential prompts once set up
- ✅ More secure for automated systems
- ⚠️ Requires SSH key setup on GitHub
- ⚠️ Need to configure SSH keys first

**Setting up SSH (optional):**
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to ssh-agent: `ssh-add ~/.ssh/id_ed25519`
3. Copy public key: `cat ~/.ssh/id_ed25519.pub`
4. Add to GitHub: Settings → SSH and GPG keys → New SSH key

## Need Help?

- See [migration-frontend.md](./migration-frontend.md) for detailed frontend instructions
- See [migration-backend.md](./migration-backend.md) for detailed backend instructions
- See [README.md](./README.md) for usage examples
- **SSH issues?** Use HTTPS instead - it works the same way!