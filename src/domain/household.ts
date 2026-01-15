import { z } from 'zod';

/**
 * Household schema
 */
export const HouseholdSchema = z.object({
  /** Household ID (UUID) */
  id: z.string().uuid(),
  /** Currency code (ISO 4217) */
  currency: z.string().length(3),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
});

export type Household = z.infer<typeof HouseholdSchema>;

/**
 * Household balance response schema
 */
export const HouseholdBalanceSchema = z.object({
  /** Balance in cents */
  balance_cents: z.number().int().nonnegative(),
  /** Currency code */
  currency: z.string().length(3),
});

export type HouseholdBalance = z.infer<typeof HouseholdBalanceSchema>;
