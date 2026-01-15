# Vercel Setup for Private Git Dependencies

Vercel needs special configuration to install private Git dependencies. This guide shows how to set it up.

## Problem

When Vercel tries to install `@kin/contract` from a private GitHub repo, it fails with:
```
git@github.com: Permission denied (publickey)
```

This happens because Vercel doesn't have SSH keys configured by default.

## Solution: Use HTTPS with Personal Access Token

### Step 1: Create GitHub Personal Access Token

1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token (classic)"**
3. **Note:** `Vercel kin-contract access`
4. **Expiration:** Choose appropriate (90 days, 1 year, or no expiration)
5. **Scopes:** Check **`repo`** (Full control of private repositories)
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again!)

### Step 2: Add Token to Vercel Environment Variables

1. Go to your Vercel project: **https://vercel.com/YOUR_PROJECT/settings/environment-variables**
2. Click **"Add New"**
3. **Key:** `GITHUB_TOKEN`
4. **Value:** Paste your personal access token
5. **Environment:** Select all (Production, Preview, Development)
6. Click **"Save"**

### Step 3: Update package.json to Use HTTPS

In your `kin-backend/package.json`, change from SSH to HTTPS:

**Before (SSH - doesn't work in Vercel):**
```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

**After (HTTPS - works with token):**
```json
{
  "dependencies": {
    "@kin/contract": "git+https://github.com/Richiemuhammed/kin-contract.git#8d7772a527eb89e68d7811da92ae872b307f3874"
  }
}
```

### Step 4: Configure Git to Use Token (Vercel Build Command)

Add this to your Vercel project settings or `vercel.json`:

**Option A: In Vercel Dashboard**

1. Go to: **Project Settings → Build & Development Settings**
2. **Build Command:** Add this before your build command:
   ```bash
   git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/" && npm install && npm run build
   ```

**Option B: In `vercel.json`**

```json
{
  "buildCommand": "git config --global url.\"https://${GITHUB_TOKEN}@github.com/\".insteadOf \"https://github.com/\" && npm install && npm run build"
}
```

**Option C: In `package.json` scripts**

```json
{
  "scripts": {
    "vercel-build": "git config --global url.\"https://${GITHUB_TOKEN}@github.com/\".insteadOf \"https://github.com/\" && npm install && npm run build"
  }
}
```

### Step 5: Redeploy

1. Push your changes to GitHub
2. Vercel will automatically redeploy
3. The build should now succeed!

## Alternative: Use SSH Deploy Key (More Complex)

If you prefer SSH, you can add a deploy key to Vercel:

1. Generate SSH key (see [deploy-key-setup.md](./deploy-key-setup.md))
2. Add public key to GitHub (Settings → Deploy keys)
3. Add private key to Vercel as environment variable: `SSH_PRIVATE_KEY`
4. Configure Vercel to use SSH key in build

**But HTTPS with token is easier and recommended!**

## Verification

After setup, your Vercel build logs should show:
```
Installing dependencies...
npm install
✓ Successfully installed @kin/contract
```

Instead of:
```
✗ Permission denied (publickey)
```

## Troubleshooting

### Still getting "Permission denied"

1. **Check token has `repo` scope** - Go to GitHub settings and verify
2. **Verify environment variable** - Check `GITHUB_TOKEN` is set in Vercel
3. **Check git config command** - Ensure it runs before `npm install`
4. **Try redeploying** - Sometimes Vercel needs a fresh build

### Token expired

1. Generate new token
2. Update `GITHUB_TOKEN` in Vercel environment variables
3. Redeploy

### Build still fails

1. Check Vercel build logs for exact error
2. Verify the commit hash is correct
3. Ensure repository is accessible with the token
4. Try the token manually: `git ls-remote https://YOUR_TOKEN@github.com/Richiemuhammed/kin-contract.git`

## Security Notes

⚠️ **Important:**
- Never commit the token to your repository
- Use Vercel environment variables only
- Rotate tokens periodically
- Use minimum required scopes (`repo` for private repos)

## Quick Checklist

- [ ] Created GitHub Personal Access Token with `repo` scope
- [ ] Added `GITHUB_TOKEN` to Vercel environment variables
- [ ] Updated `package.json` to use HTTPS instead of SSH
- [ ] Configured git to use token in build command
- [ ] Redeployed and verified build succeeds
