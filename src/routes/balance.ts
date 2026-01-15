import { z } from 'zod';
import { MetaSchema } from '../meta';

/**
 * POST /balance/topup/initiate - Initiate balance top-up
 */
export const TopupInitiateRequestSchema = z.object({
  /** Amount in cents */
  amount_cents: z.number().int().positive(),
  /** Idempotency key for safe retries */
  idempotency_key: z.string().min(1),
  /** Currency code (ISO 4217), defaults to household currency */
  currency: z.string().length(3).optional(),
});

export type TopupInitiateRequest = z.infer<typeof TopupInitiateRequestSchema>;

export const TopupInitiateResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    /** Payment URL to redirect user to */
    payment_url: z.string().url(),
    /** Transaction ID for tracking */
    transaction_id: z.string().uuid(),
  }),
  meta: MetaSchema,
});

export type TopupInitiateResponse = z.infer<typeof TopupInitiateResponseSchema>;

/**
 * POST /balance/withdraw/initiate - Initiate balance withdrawal
 */
export const WithdrawInitiateRequestSchema = z.object({
  /** Amount in cents */
  amount_cents: z.number().int().positive(),
  /** Idempotency key for safe retries */
  idempotency_key: z.string().min(1),
});

export type WithdrawInitiateRequest = z.infer<typeof WithdrawInitiateRequestSchema>;

export const WithdrawInitiateResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    /** Transaction ID for tracking */
    transaction_id: z.string().uuid(),
  }),
  meta: MetaSchema,
});

export type WithdrawInitiateResponse = z.infer<typeof WithdrawInitiateResponseSchema>;
