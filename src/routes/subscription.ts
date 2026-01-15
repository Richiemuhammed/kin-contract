import { z } from 'zod';
import { MetaSchema } from '../meta';
import { SubscriptionSchema, SubscriptionCheckoutSchema } from '../domain/subscription';

/**
 * GET /subscription - Get current subscription
 */
export const GetSubscriptionResponseSchema = z.object({
  ok: z.literal(true),
  data: SubscriptionSchema.nullable(),
  meta: MetaSchema,
});

export type GetSubscriptionResponse = z.infer<typeof GetSubscriptionResponseSchema>;

/**
 * POST /subscription/checkout - Create subscription checkout session
 */
export const SubscriptionCheckoutRequestSchema = SubscriptionCheckoutSchema;

export type SubscriptionCheckoutRequest = z.infer<typeof SubscriptionCheckoutRequestSchema>;

export const SubscriptionCheckoutResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    /** Checkout URL to redirect user to */
    checkout_url: z.string().url(),
  }),
  meta: MetaSchema,
});

export type SubscriptionCheckoutResponse = z.infer<typeof SubscriptionCheckoutResponseSchema>;

/**
 * POST /subscription/portal - Get subscription management portal URL
 * Auth via Bearer token in Authorization header
 */
export const SubscriptionPortalResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    /** Portal URL to redirect user to */
    portal_url: z.string().url(),
  }),
  meta: MetaSchema,
});

export type SubscriptionPortalResponse = z.infer<typeof SubscriptionPortalResponseSchema>;
