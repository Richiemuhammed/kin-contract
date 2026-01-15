# Deploy Key to Paste in GitHub

## What to Paste

Copy this entire line (it's the public key):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMHaZ6JV4pBGzo5/Tw6a4kw5pmUlMr4AMgpgNnp0koVQ kin-contract-deploy-key
```

## Where to Paste It

1. Go to: **https://github.com/Richiemuhammed/kin-contract/settings/keys**
2. Click the green button: **"Add deploy key"**
3. Fill in:
   - **Title:** `CI/CD Deploy Key` (or any descriptive name)
   - **Key:** Paste the entire line above (starts with `ssh-ed25519`)
   - **Allow write access:** ❌ Leave unchecked (read-only is enough)
4. Click **"Add key"**

## What This Does

This deploy key allows CI/CD systems (like GitHub Actions, Vercel, Netlify) to:
- ✅ Clone the private `kin-contract` repository
- ✅ Install the package during builds
- ✅ Access the repository without personal credentials

## Important Notes

⚠️ **This is the PUBLIC key** - it's safe to share and paste in GitHub.

🔒 **Keep the PRIVATE key secret:**
- Location: `~/.ssh/kin-contract-deploy-key` (on the machine where you generated it)
- Never commit it to git
- Add it as a secret in your CI/CD system (see deploy-key-setup.md)

## Next Steps

After adding the deploy key to GitHub:

1. **For GitHub Actions:** Add the private key as a secret named `KIN_CONTRACT_DEPLOY_KEY`
2. **For other CI/CD:** See deploy-key-setup.md for instructions

---

**Note:** If you need to generate a new key, run:
```bash
ssh-keygen -t ed25519 -C "kin-contract-deploy-key" -f ~/.ssh/kin-contract-deploy-key -N ""
```
