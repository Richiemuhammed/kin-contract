import { z } from 'zod';

/**
 * Subscription status enum
 */
export const SubscriptionStatusSchema = z.enum(['active', 'cancelled', 'expired', 'trial']);

export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;

/**
 * Subscription tier enum
 */
export const SubscriptionTierSchema = z.enum(['monthly', 'quarterly', 'yearly']);

export type SubscriptionTier = z.infer<typeof SubscriptionTierSchema>;

/**
 * Subscription schema
 */
export const SubscriptionSchema = z.object({
  /** Subscription ID (UUID) */
  id: z.string().uuid(),
  /** Profile ID of subscriber */
  profile_id: z.string().uuid(),
  /** Household ID */
  household_id: z.string().uuid(),
  /** Subscription tier */
  tier: SubscriptionTierSchema,
  /** Subscription status */
  status: SubscriptionStatusSchema,
  /** Current period start */
  current_period_start: z.string().datetime(),
  /** Current period end */
  current_period_end: z.string().datetime(),
  /** External subscription ID (from payment provider) */
  external_subscription_id: z.string().nullable(),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

/**
 * Schema for subscription checkout
 */
export const SubscriptionCheckoutSchema = z.object({
  /** Subscription tier to purchase */
  tier: SubscriptionTierSchema,
});

export type SubscriptionCheckout = z.infer<typeof SubscriptionCheckoutSchema>;
