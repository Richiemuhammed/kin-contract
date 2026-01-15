import { z } from 'zod';

/**
 * Transaction direction enum
 */
export const TransactionDirectionSchema = z.enum(['in', 'out']);

export type TransactionDirection = z.infer<typeof TransactionDirectionSchema>;

/**
 * Transaction type enum
 */
export const TransactionTypeSchema = z.enum(['funding', 'payout', 'reversal', 'adjustment']);

export type TransactionType = z.infer<typeof TransactionTypeSchema>;

/**
 * Transaction status enum
 */
export const TransactionStatusSchema = z.enum(['pending', 'completed', 'failed', 'cancelled']);

export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

/**
 * Transaction/Ledger entry schema
 */
export const TransactionSchema = z.object({
  /** Transaction ID (UUID) */
  id: z.string().uuid(),
  /** Household ID */
  household_id: z.string().uuid(),
  /** Profile ID associated with this transaction */
  profile_id: z.string().uuid(),
  /** Request ID if transaction is linked to a request */
  request_id: z.string().uuid().nullable(),
  /** Amount in cents */
  amount_cents: z.number().int().positive(),
  /** Transaction direction */
  direction: TransactionDirectionSchema,
  /** Transaction type */
  type: TransactionTypeSchema,
  /** Optional description */
  description: z.string().nullable(),
  /** Transaction status */
  status: TransactionStatusSchema,
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
