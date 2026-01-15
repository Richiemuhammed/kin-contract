import { z } from 'zod';
import { MetaSchema } from './meta';

/**
 * Standard error codes used across the API
 */
export enum ErrorCode {
  /** Validation error (400) */
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  /** Unauthorized (401) */
  UNAUTHORIZED = 'UNAUTHORIZED',
  /** Forbidden (403) */
  FORBIDDEN = 'FORBIDDEN',
  /** Not found (404) */
  NOT_FOUND = 'NOT_FOUND',
  /** Conflict (409) */
  CONFLICT = 'CONFLICT',
  /** Rate limited (429) */
  RATE_LIMITED = 'RATE_LIMITED',
  /** Internal server error (500) */
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  /** Service unavailable (503) */
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  /** Payment processing error */
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  /** Insufficient balance */
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  /** Idempotency key conflict */
  IDEMPOTENCY_CONFLICT = 'IDEMPOTENCY_CONFLICT',
}

/**
 * Error schema
 */
export const ErrorSchema = z.object({
  /** Error code */
  code: z.nativeEnum(ErrorCode),
  /** Human-readable error message */
  message: z.string(),
  /** Additional error details (optional) */
  details: z.unknown().optional(),
});

export type Error = z.infer<typeof ErrorSchema>;

/**
 * Error response schema
 */
export const ErrorResponseSchema = z.object({
  ok: z.literal(false),
  error: ErrorSchema,
  meta: MetaSchema,
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
