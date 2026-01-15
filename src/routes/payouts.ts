import { z } from 'zod';
import { MetaSchema } from '../meta';
import { PayoutSchema, PayoutExecuteSchema, PayoutStatusSchema } from '../domain/payout';

/**
 * POST /payouts/execute - Execute a payout
 */
export const ExecutePayoutRequestSchema = PayoutExecuteSchema;

export type ExecutePayoutRequest = z.infer<typeof ExecutePayoutRequestSchema>;

export const ExecutePayoutResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    payout: PayoutSchema,
  }),
  meta: MetaSchema,
});

export type ExecutePayoutResponse = z.infer<typeof ExecutePayoutResponseSchema>;

/**
 * GET /payouts - Get payouts
 */
export const GetPayoutsRequestSchema = z.object({
  /** Limit number of results */
  limit: z.number().int().positive().max(100).optional(),
  /** Filter by status */
  status: PayoutStatusSchema.optional(),
  /** Filter by kin member ID */
  kin_id: z.string().uuid().optional(),
});

export type GetPayoutsRequest = z.infer<typeof GetPayoutsRequestSchema>;

export const GetPayoutsResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    payouts: z.array(PayoutSchema),
  }),
  meta: MetaSchema,
});

export type GetPayoutsResponse = z.infer<typeof GetPayoutsResponseSchema>;
