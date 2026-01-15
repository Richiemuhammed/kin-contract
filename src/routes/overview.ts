import { z } from 'zod';
import { MetaSchema } from '../meta';
import { RequestWithKinSchema } from '../domain/request';
import { TransactionSchema } from '../domain/transaction';

/**
 * GET /overview - Get dashboard overview
 */
export const GetOverviewResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    /** Current balance in cents */
    balance_cents: z.number().int().nonnegative(),
    /** Number of pending requests */
    pending_requests: z.number().int().nonnegative(),
    /** Recent requests */
    recent_requests: z.array(RequestWithKinSchema),
    /** Recent transactions */
    recent_transactions: z.array(TransactionSchema),
  }),
  meta: MetaSchema,
});

export type GetOverviewResponse = z.infer<typeof GetOverviewResponseSchema>;
