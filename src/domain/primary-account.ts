import { z } from 'zod';

/**
 * Primary account schema
 * Bank account for dependents to receive payouts
 */
export const PrimaryAccountSchema = z.object({
  /** Primary account ID (UUID) */
  id: z.string().uuid(),
  /** Profile ID (one-to-one relationship) */
  profile_id: z.string().uuid(),
  /** Account name */
  account_name: z.string().min(1),
  /** Account number */
  account_number: z.string().min(1),
  /** Bank name (optional) */
  bank_name: z.string().nullable(),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
});

export type PrimaryAccount = z.infer<typeof PrimaryAccountSchema>;

/**
 * Schema for creating/updating primary account
 */
export const PrimaryAccountCreateSchema = z.object({
  account_name: z.string().min(1),
  account_number: z.string().min(1),
  bank_name: z.string().optional(),
});

export type PrimaryAccountCreate = z.infer<typeof PrimaryAccountCreateSchema>;
