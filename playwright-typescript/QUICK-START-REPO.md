# Quick Start - Create Your Repository

Follow these exact commands to create your GitHub repository and publish the framework.

---

## 🚀 Step 1: Initialize Git (2 minutes)

```bash
# Navigate to the framework folder
cd ari-automation-framework-ts

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Shivam Playwright-Typescript v2.0.5"

# Verify
git log
```

---

## 🌐 Step 2: Create GitHub Repository (5 minutes)

### Option A: Using GitHub Web Interface

1. Go to https://github.com/new
2. **Repository name**: `ari-automation-framework`
3. **Description**: "Enterprise-grade automation framework built on Playwright and TypeScript"
4. **Visibility**: Choose Public or Private
5. **Initialize repository**: Leave unchecked (we have existing code)
6. Click **Create repository**

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Create repository
gh repo create ari-automation-framework --public --source=. --remote=origin --push
```

---

## 📤 Step 3: Push to GitHub (2 minutes)

After creating the repository, you'll see instructions. Follow them:

```bash
# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR-USERNAME/ari-automation-framework.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main

# Verify
git remote -v
git branch -a
```

---

## ✅ Step 4: Verify Repository (2 minutes)

```bash
# Check git status
git status

# View commit history
git log --oneline

# View remote
git remote -v
```

---

## 📦 Step 5: Publish to NPM (Optional - 5 minutes)

### Prerequisites
- NPM account: https://www.npmjs.com/
- Verified email
- 2FA enabled (recommended)

### Commands

```bash
# Login to NPM
npm login

# Verify package name is available
npm search @leadventure/ari-automation-framework

# Build the framework
npm run build

# Publish to NPM
npm publish

# Verify publication
npm info @leadventure/ari-automation-framework
```

---

## 🔧 Step 6: Configure Repository (5 minutes)

### GitHub Settings

1. Go to your repository: https://github.com/YOUR-USERNAME/ari-automation-framework
2. Click **Settings**
3. Configure:

#### General
- [x] Description: "Enterprise-grade automation framework built on Playwright and TypeScript"
- [x] Website: https://github.com/leadventure/ari-automation-framework
- [x] Topics: automation, testing, playwright, typescript, bdd

#### Branches
- [x] Default branch: main
- [x] Branch protection rules (optional):
  - Require pull request reviews
  - Require status checks to pass

#### Collaborators
- [x] Add team members if needed

---

## 📝 Step 7: Add GitHub Actions (Optional - 10 minutes)

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run build
      - run: npm test
```

Then:
```bash
git add .github/workflows/test.yml
git commit -m "Add GitHub Actions CI/CD"
git push
```

---

## 🎯 Complete Checklist

### Git & GitHub
- [ ] Git initialized locally
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Repository verified

### Configuration
- [ ] Repository description updated
- [ ] Topics added
- [ ] Branch protection configured (optional)
- [ ] Collaborators added (optional)

### CI/CD (Optional)
- [ ] GitHub Actions configured
- [ ] Tests running on push
- [ ] Status checks passing

### NPM (Optional)
- [ ] NPM account created
- [ ] Package published
- [ ] Installation verified

---

## 🔗 Useful Links

### Your Repository
- Repository: https://github.com/YOUR-USERNAME/ari-automation-framework
- Issues: https://github.com/YOUR-USERNAME/ari-automation-framework/issues
- Discussions: https://github.com/YOUR-USERNAME/ari-automation-framework/discussions

### NPM Package
- Package: https://www.npmjs.com/package/@leadventure/ari-automation-framework
- Documentation: https://www.npmjs.com/package/@leadventure/ari-automation-framework

### External Resources
- GitHub Docs: https://docs.github.com/
- NPM Docs: https://docs.npmjs.com/
- Playwright Docs: https://playwright.dev/

---

## 🆘 Troubleshooting

### Git Issues

**Problem**: "fatal: not a git repository"
```bash
# Solution: Initialize git first
git init
```

**Problem**: "Permission denied (publickey)"
```bash
# Solution: Set up SSH keys
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### GitHub Issues

**Problem**: "Repository already exists"
```bash
# Solution: Use different repository name or delete existing one
```

**Problem**: "Push rejected"
```bash
# Solution: Pull latest changes first
git pull origin main
git push origin main
```

### NPM Issues

**Problem**: "Package name already taken"
```bash
# Solution: Use different package name or scope
# Example: @yourorg/ari-automation-framework
```

**Problem**: "Not authenticated"
```bash
# Solution: Login to NPM
npm login
```

---

## 📊 Time Estimate

| Step | Time | Optional |
|------|------|----------|
| Initialize Git | 2 min | No |
| Create GitHub Repo | 5 min | No |
| Push to GitHub | 2 min | No |
| Verify Repository | 2 min | No |
| Publish to NPM | 5 min | Yes |
| Configure Repository | 5 min | Yes |
| Add GitHub Actions | 10 min | Yes |
| **Total** | **31 min** | - |

---

## 🎉 Success!

Once you've completed these steps:

1. ✅ Your framework is on GitHub
2. ✅ Your team can clone and use it
3. ✅ (Optional) Your package is on NPM
4. ✅ (Optional) CI/CD is running automatically

---

## 📚 Next Steps

After repository creation:

1. **Share with Team**
   ```bash
   # Team members can clone
   git clone https://github.com/YOUR-USERNAME/ari-automation-framework.git
   cd ari-automation-framework
   npm install
   ```

2. **Start Using**
   ```bash
   # Install from NPM (if published)
   npm install @leadventure/ari-automation-framework
   
   # Or clone from GitHub
   git clone https://github.com/YOUR-USERNAME/ari-automation-framework.git
   ```

3. **Create Issues & Discussions**
   - Report bugs
   - Request features
   - Share feedback

4. **Contribute**
   - Create branches for features
   - Submit pull requests
   - Review code

---

## 💡 Pro Tips

1. **Use SSH for Git**
   - More secure than HTTPS
   - No password prompts
   - Set up: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

2. **Create .gitignore**
   - Already included in this framework
   - Prevents committing node_modules, logs, etc.

3. **Use Semantic Versioning**
   - Major.Minor.Patch (e.g., 2.0.5)
   - Update in package.json before publishing

4. **Add Collaborators**
   - Settings → Collaborators
   - Give appropriate permissions

5. **Enable Branch Protection**
   - Require pull request reviews
   - Require status checks to pass
   - Prevent direct pushes to main

---

## 📞 Support

- 📖 [Framework Documentation](./FRAMEWORK-CONSTITUTION.md)
- 🚀 [Setup Guide](./SETUP-GUIDE.md)
- 📝 [Quick Reference](./QUICK-REFERENCE.md)
- 🗂️ [Documentation Index](./INDEX.md)

---

**Ready to create your repository?** 🚀

Start with Step 1 above and follow the commands exactly!

---

**Framework Version**: 2.0.5  
**Last Updated**: November 2024  
**License**: MIT
