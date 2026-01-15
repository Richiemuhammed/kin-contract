import { z } from 'zod';

/**
 * Payout status enum
 */
export const PayoutStatusSchema = z.enum(['pending', 'processing', 'completed', 'failed', 'cancelled']);

export type PayoutStatus = z.infer<typeof PayoutStatusSchema>;

/**
 * Payout schema
 */
export const PayoutSchema = z.object({
  /** Payout ID (UUID) */
  id: z.string().uuid(),
  /** Household ID */
  household_id: z.string().uuid(),
  /** Kin member ID receiving the payout */
  kin_id: z.string().uuid(),
  /** Profile ID of user who initiated the payout */
  initiator_profile_id: z.string().uuid(),
  /** Amount in cents */
  amount_cents: z.number().int().positive(),
  /** Payout status */
  status: PayoutStatusSchema,
  /** Optional description */
  description: z.string().nullable(),
  /** External payment provider transaction ID */
  external_transaction_id: z.string().nullable(),
  /** Failure reason if payout failed */
  failure_reason: z.string().nullable(),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
  /** Completed timestamp */
  completed_at: z.string().datetime().nullable(),
});

export type Payout = z.infer<typeof PayoutSchema>;

/**
 * Schema for executing a payout
 */
export const PayoutExecuteSchema = z.object({
  /** Amount in cents */
  amount_cents: z.number().int().positive(),
  /** Kin member ID to pay */
  kin_id: z.string().uuid(),
  /** Idempotency key for safe retries */
  idempotency_key: z.string().min(1),
  /** Optional description */
  description: z.string().optional(),
});

export type PayoutExecute = z.infer<typeof PayoutExecuteSchema>;
