# Deploy Key Setup for CI/CD

This guide explains how to set up a deploy key so CI/CD systems can access the private `kin-contract` repository.

## What is a Deploy Key?

A deploy key is an SSH key that grants read-only access to a single repository. It's perfect for CI/CD systems that need to install the contract package.

## Step 1: Generate SSH Key (One Time)

Run this command on your local machine or CI server:

```bash
ssh-keygen -t ed25519 -C "kin-contract-deploy-key" -f ~/.ssh/kin-contract-deploy-key -N ""
```

This creates:
- **Private key:** `~/.ssh/kin-contract-deploy-key` (keep this secret!)
- **Public key:** `~/.ssh/kin-contract-deploy-key.pub` (add this to GitHub)

## Step 2: Copy the Public Key

```bash
cat ~/.ssh/kin-contract-deploy-key.pub
```

Copy the entire output. It will look like:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... kin-contract-deploy-key
```

## Step 3: Add Deploy Key to GitHub

1. Go to: `https://github.com/Richiemuhammed/kin-contract/settings/keys`
2. Click **"Add deploy key"**
3. **Title:** `CI/CD Deploy Key` (or any name you prefer)
4. **Key:** Paste the public key you copied
5. ✅ **Check:** "Allow write access" (only if you need CI to push - usually not needed)
6. Click **"Add key"**

## Step 4: Use in CI/CD

### GitHub Actions

Add the private key as a secret, then use it:

```yaml
# .github/workflows/ci.yml
- name: Setup SSH
  run: |
    mkdir -p ~/.ssh
    echo "${{ secrets.KIN_CONTRACT_DEPLOY_KEY }}" > ~/.ssh/id_ed25519
    chmod 600 ~/.ssh/id_ed25519
    ssh-keyscan github.com >> ~/.ssh/known_hosts

- name: Install dependencies
  run: npm install
```

**Add secret in GitHub:**
1. Go to: `https://github.com/YOUR_ORG/kin/settings/secrets/actions`
2. Click **"New repository secret"**
3. **Name:** `KIN_CONTRACT_DEPLOY_KEY`
4. **Value:** Paste the **private key** content:
   ```bash
   cat ~/.ssh/kin-contract-deploy-key
   ```
5. Click **"Add secret"**

### Other CI Systems (Vercel, Netlify, etc.)

**Option A: Use HTTPS with Personal Access Token**

1. Create GitHub Personal Access Token:
   - Go to: `https://github.com/settings/tokens`
   - Click **"Generate new token (classic)"**
   - **Scopes:** Check `repo` (full control of private repositories)
   - Copy the token

2. Use in CI:
   ```bash
   git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
   npm install
   ```

3. Add token as environment variable:
   - **Name:** `GITHUB_TOKEN`
   - **Value:** Your personal access token

**Option B: Use SSH Deploy Key**

1. Add private key as environment variable:
   - **Name:** `SSH_PRIVATE_KEY`
   - **Value:** Content of `~/.ssh/kin-contract-deploy-key`

2. Setup in CI:
   ```bash
   mkdir -p ~/.ssh
   echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_ed25519
   chmod 600 ~/.ssh/id_ed25519
   ssh-keyscan github.com >> ~/.ssh/known_hosts
   npm install
   ```

## Quick Reference

### For GitHub Actions (Recommended)

1. **Generate key:** `ssh-keygen -t ed25519 -C "deploy" -f ~/.ssh/deploy-key -N ""`
2. **Add public key to repo:** Settings → Deploy keys → Add deploy key
3. **Add private key as secret:** Settings → Secrets → Actions → New secret
   - Name: `KIN_CONTRACT_DEPLOY_KEY`
   - Value: Content of `~/.ssh/deploy-key`
4. **Use in workflow:** See example above

### For Other CI/CD

**Easiest:** Use HTTPS with Personal Access Token
- Create token with `repo` scope
- Add as `GITHUB_TOKEN` environment variable
- Configure git to use token (see example above)

## Security Notes

⚠️ **Important:**
- **Never commit the private key** to your repository
- **Never share the private key** publicly
- **Use secrets/environment variables** to store private keys
- **Rotate keys periodically** (every 6-12 months)
- **Use separate keys** for different environments if needed

## Testing the Deploy Key

Test locally that the key works:

```bash
# Test SSH connection
ssh -T git@github.com -i ~/.ssh/kin-contract-deploy-key

# Should see: "Hi Richiemuhammed/kin-contract! You've successfully authenticated..."
```

## Troubleshooting

### "Permission denied (publickey)"
- Check that public key is added to GitHub
- Verify private key is correct in CI secrets
- Ensure SSH key format is correct (ed25519 recommended)

### "Host key verification failed"
- Add GitHub to known_hosts: `ssh-keyscan github.com >> ~/.ssh/known_hosts`

### "Repository not found"
- Verify deploy key has access to the repository
- Check repository is private (deploy keys only work for private repos)
- Ensure key is added to the correct repository

## Alternative: Use GitHub App (Advanced)

For more complex setups, consider using a GitHub App instead of deploy keys. This provides:
- Better access control
- Token rotation
- Multiple repository access
- Fine-grained permissions

See: https://docs.github.com/en/apps/creating-github-apps
