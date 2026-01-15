import { z } from 'zod';

/**
 * Stripe webhook event types
 */
export const StripeEventTypeSchema = z.enum([
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'charge.succeeded',
  'charge.failed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
]);

export type StripeEventType = z.infer<typeof StripeEventTypeSchema>;

/**
 * Stripe webhook verification headers
 */
export const StripeWebhookHeadersSchema = z.object({
  /** Stripe signature for verification */
  'stripe-signature': z.string(),
  /** Content type */
  'content-type': z.string().optional(),
});

export type StripeWebhookHeaders = z.infer<typeof StripeWebhookHeadersSchema>;

/**
 * Stripe webhook payload
 */
export const StripeWebhookPayloadSchema = z.object({
  /** Event ID */
  id: z.string(),
  /** Event type */
  type: StripeEventTypeSchema,
  /** Event data */
  data: z.object({
    object: z.record(z.unknown()),
  }),
  /** Event creation timestamp */
  created: z.number().int(),
});

export type StripeWebhookPayload = z.infer<typeof StripeWebhookPayloadSchema>;

/**
 * Complete Stripe webhook request schema
 */
export const StripeWebhookRequestSchema = z.object({
  headers: StripeWebhookHeadersSchema,
  body: StripeWebhookPayloadSchema,
});

export type StripeWebhookRequest = z.infer<typeof StripeWebhookRequestSchema>;
