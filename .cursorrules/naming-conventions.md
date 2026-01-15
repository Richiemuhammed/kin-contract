# Naming Conventions

## File and Folder Names

**Use kebab-case for all file and folder names.**

### Examples

✅ **Correct:**
- `user-profile.ts`
- `api-client.ts`
- `error-handler.ts`
- `migration-guide.md`
- `deploy-key-setup.md`
- `src/routes/api-endpoints/`
- `src/utils/date-helpers.ts`

❌ **Incorrect:**
- `userProfile.ts` (camelCase)
- `UserProfile.ts` (PascalCase)
- `user_profile.ts` (snake_case)
- `USER_PROFILE.ts` (SCREAMING_SNAKE_CASE)

### Rules

1. **Files:** Always use kebab-case
   - TypeScript files: `my-component.ts`, `api-client.tsx`
   - Markdown files: `migration-guide.md`, `setup-instructions.md`
   - Config files: `tsconfig.json`, `package.json` (standard names are fine)

2. **Folders:** Always use kebab-case
   - `src/components/`, `src/utils/`, `src/api-routes/`

3. **Exceptions:**
   - Standard config files can keep their names: `package.json`, `tsconfig.json`, `.gitignore`
   - Files that must match external conventions (e.g., `index.ts` for entry points)

### When Creating New Files

Always use kebab-case:
- New components: `user-settings.tsx`
- New utilities: `format-date.ts`
- New types: `api-response.ts`
- New hooks: `use-api-data.ts`
- New tests: `user-settings.test.ts`

## Variable and Function Names

**Use camelCase for variables and functions** (standard JavaScript/TypeScript convention):

✅ **Correct:**
- `const userName = 'John'`
- `function getUserProfile() {}`
- `const apiClient = new ApiClient()`

❌ **Incorrect:**
- `const user_name = 'John'` (snake_case)
- `function GetUserProfile() {}` (PascalCase - only for classes/components)

## Class and Component Names

**Use PascalCase for classes and React components:**

✅ **Correct:**
- `class ApiClient {}`
- `function UserProfile() {}`
- `export const UserSettings = () => {}`

## Constants

**Use SCREAMING_SNAKE_CASE for constants:**

✅ **Correct:**
- `const API_BASE_URL = 'https://api.example.com'`
- `const MAX_RETRY_ATTEMPTS = 3`

## Summary

| Type | Convention | Example |
|------|------------|---------|
| Files & Folders | kebab-case | `user-profile.ts` |
| Variables & Functions | camelCase | `getUserProfile()` |
| Classes & Components | PascalCase | `UserProfile` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
