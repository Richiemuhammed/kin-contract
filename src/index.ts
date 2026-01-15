/**
 * @kin/contract - Shared API contract between Kin backend and frontend
 * 
 * This package provides Zod schemas and TypeScript types for all API endpoints,
 * ensuring type safety and runtime validation across both backend and frontend.
 */

// Core schemas
export * from './meta';
export * from './pagination';
export * from './errors';

// Domain models
export * from './domain/user';
export * from './domain/kin-member';
export * from './domain/request';
export * from './domain/approval';
export * from './domain/payout';
export * from './domain/transaction';
export * from './domain/subscription';
export * from './domain/household';
export * from './domain/primary-account';

// Route schemas
export * from './routes/auth';
export * from './routes/overview';
export * from './routes/requests';
export * from './routes/payouts';
export * from './routes/kin-members';
export * from './routes/ledger';
export * from './routes/balance';
export * from './routes/subscription';

// Webhook schemas
export * from './webhooks/flutterwave';
export * from './webhooks/stripe';

// OpenAPI generation
export { generateOpenAPISpec } from './openapi';

// Helper functions
import { z } from 'zod';
import { MetaSchema, type Meta } from './meta';
import { ErrorSchema, ErrorCode, type Error } from './errors';

/**
 * Infer TypeScript type from Zod schema
 */
export function inferType<T extends z.ZodTypeAny>(schema: T): z.infer<T> {
  // This is a type-only helper - actual inference happens at compile time
  return {} as z.infer<T>;
}

/**
 * Create a success response with consistent format
 */
export function createSuccessResponse<T>(
  data: T,
  meta: Meta
): { ok: true; data: T; meta: Meta } {
  return {
    ok: true,
    data,
    meta,
  };
}

/**
 * Create an error response with consistent format
 */
export function createErrorResponse(
  code: ErrorCode,
  message: string,
  details?: unknown,
  meta?: Meta
): { ok: false; error: Error; meta: Meta } {
  return {
    ok: false,
    error: {
      code,
      message,
      details,
    },
    meta: meta || {
      request_id: crypto.randomUUID(),
      server_time: new Date().toISOString(),
      version: '1.0.0',
    },
  };
}

/**
 * Validate response against schema (runtime validation)
 */
export function validateResponse<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  return schema.parse(data);
}

/**
 * Safe parse response (returns success/error instead of throwing)
 */
export function safeParseResponse<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
