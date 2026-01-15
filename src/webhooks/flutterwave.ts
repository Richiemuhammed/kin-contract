import { z } from 'zod';

/**
 * Flutterwave webhook event types
 */
export const FlutterwaveEventTypeSchema = z.enum([
  'charge.completed',
  'charge.failed',
  'transfer.completed',
  'transfer.failed',
  'transfer.reversed',
  'subscription.created',
  'subscription.cancelled',
]);

export type FlutterwaveEventType = z.infer<typeof FlutterwaveEventTypeSchema>;

/**
 * Flutterwave webhook verification headers
 */
export const FlutterwaveWebhookHeadersSchema = z.object({
  /** Flutterwave signature for verification */
  'verif-hash': z.string().optional(),
  /** Content type */
  'content-type': z.string().optional(),
});

export type FlutterwaveWebhookHeaders = z.infer<typeof FlutterwaveWebhookHeadersSchema>;

/**
 * Flutterwave webhook payload
 */
export const FlutterwaveWebhookPayloadSchema = z.object({
  /** Event type */
  event: FlutterwaveEventTypeSchema,
  /** Event data */
  data: z.record(z.unknown()),
  /** Transaction reference */
  'data.transaction_id': z.string().optional(),
  /** Transaction amount */
  'data.amount': z.number().optional(),
  /** Transaction currency */
  'data.currency': z.string().optional(),
  /** Transaction status */
  'data.status': z.string().optional(),
});

export type FlutterwaveWebhookPayload = z.infer<typeof FlutterwaveWebhookPayloadSchema>;

/**
 * Complete Flutterwave webhook request schema
 */
export const FlutterwaveWebhookRequestSchema = z.object({
  headers: FlutterwaveWebhookHeadersSchema,
  body: FlutterwaveWebhookPayloadSchema,
});

export type FlutterwaveWebhookRequest = z.infer<typeof FlutterwaveWebhookRequestSchema>;
