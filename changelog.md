# Changelog

All notable changes to the `@kin/contract` package will be documented in this file.

## [1.0.1] - 2025-01-15

### Fixed
- **BREAKING FIX**: Moved `@asteasolutions/zod-to-openapi` from `devDependencies` to `dependencies`
  - This was required because `generateOpenAPISpec` is exported from the main entrypoint
  - Consumers need this dependency at runtime, not just during build
  - Frontend/backend installations will now correctly include OpenAPI dependencies

### Changed
- Version bumped to 1.0.1 to reflect the dependency fix

## [1.0.0] - 2025-01-15

### Added
- Initial standalone package release
- All Zod schemas and TypeScript types for Kin API
- OpenAPI 3.0 specification generation
- Helper functions for creating success/error responses
- Runtime validation utilities
- Complete domain models (user, kin-member, request, payout, transaction, subscription, household, primary-account)
- Route schemas for all API endpoints
- Webhook schemas (Flutterwave, Stripe)
- Migration guides for frontend and backend

### Technical Details
- Standalone TypeScript package
- Builds to `dist/` directory
- Auto-builds on install via `prepare` script
- Compatible with both frontend and backend installations
