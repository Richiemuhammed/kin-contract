import { z } from 'zod';
import { MetaSchema } from '../meta';
import { CursorPaginationMetaSchema } from '../pagination';
import {
  TransactionSchema,
  TransactionDirectionSchema,
  TransactionTypeSchema,
  TransactionStatusSchema,
} from '../domain/transaction';

/**
 * GET /ledger - Get ledger/transactions
 */
export const GetLedgerRequestSchema = z.object({
  /** Limit number of results */
  limit: z.number().int().positive().max(100).optional(),
  /** Filter by direction */
  direction: TransactionDirectionSchema.optional(),
  /** Filter by type */
  type: TransactionTypeSchema.optional(),
  /** Filter by status */
  status: TransactionStatusSchema.optional(),
  /** Cursor for pagination */
  cursor: z.string().optional(),
});

export type GetLedgerRequest = z.infer<typeof GetLedgerRequestSchema>;

export const GetLedgerResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    transactions: z.array(TransactionSchema),
    pagination: CursorPaginationMetaSchema,
  }),
  meta: MetaSchema,
});

export type GetLedgerResponse = z.infer<typeof GetLedgerResponseSchema>;
