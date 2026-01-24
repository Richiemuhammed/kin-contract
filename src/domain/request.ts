import { z } from 'zod';

/**
 * Request source — who created the obligation (owner-logged vs dependent-proposed)
 */
export const RequestSourceSchema = z.enum(['owner', 'dependent']);

export type RequestSource = z.infer<typeof RequestSourceSchema>;

/**
 * Request status enum (Responsibility Engine)
 */
export const RequestStatusSchema = z.enum([
  'pending',
  'approved',
  'scheduled',
  'processing',
  'paid',
  'failed',
  'rejected',
  'cancelled',
]);

export type RequestStatus = z.infer<typeof RequestStatusSchema>;

/**
 * Request priority
 */
export const RequestPrioritySchema = z.enum(['critical', 'high', 'normal', 'low']);

export type RequestPriority = z.infer<typeof RequestPrioritySchema>;

/**
 * Request amount type
 */
export const RequestAmountTypeSchema = z.enum(['fixed', 'variable']);

export type RequestAmountType = z.infer<typeof RequestAmountTypeSchema>;

/**
 * Request schema
 */
export const RequestSchema = z.object({
  /** Request ID (UUID) */
  id: z.string().uuid(),
  /** Household ID */
  household_id: z.string().uuid(),
  /** Kin member ID this request is for */
  kin_id: z.string().uuid(),
  /** Profile ID of user who created the request */
  requester_profile_id: z.string().uuid(),
  /** Request title */
  title: z.string().min(1),
  /** Amount in cents */
  amount_cents: z.number().int().positive(),
  /** Request status */
  status: RequestStatusSchema,
  /** Who created the obligation (owner vs dependent) */
  source: RequestSourceSchema,
  /** Optional description */
  description: z.string().nullable(),
  /** Optional due date */
  due_date: z.string().datetime().nullable(),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
  /** Priority (optional) */
  priority: RequestPrioritySchema.optional(),
  /** Amount type: fixed vs variable (optional) */
  amount_type: RequestAmountTypeSchema.optional(),
  /** Immutable payout copy at execution (optional) */
  payout_snapshot: z.record(z.string(), z.unknown()).nullable().optional(),
  /** Recurrence rule (optional) */
  recurrence_rule: z.string().nullable().optional(),
  /** Recurrence end datetime, ISO (optional) */
  recurrence_end_at: z.string().datetime().nullable().optional(),
});

export type Request = z.infer<typeof RequestSchema>;

/**
 * Request with nested kin member data
 */
export const RequestWithKinSchema = RequestSchema.extend({
  kin: z.object({
    id: z.string().uuid(),
    display_name: z.string(),
    profile_url: z.string().url().nullable(),
  }),
});

export type RequestWithKin = z.infer<typeof RequestWithKinSchema>;

/**
 * Schema for creating a request
 */
export const RequestCreateSchema = z.object({
  kin_id: z.string().uuid(),
  title: z.string().min(1),
  amount_cents: z.number().int().positive(),
  description: z.string().optional(),
  due_date: z.string().datetime().optional(),
});

export type RequestCreate = z.infer<typeof RequestCreateSchema>;

/**
 * Schema for approving a request
 */
export const RequestApproveSchema = z.object({
  /** Idempotency key for safe retries */
  idempotency_key: z.string().min(1),
});

export type RequestApprove = z.infer<typeof RequestApproveSchema>;

/**
 * Schema for rejecting a request
 */
export const RequestRejectSchema = z.object({
  /** Idempotency key for safe retries */
  idempotency_key: z.string().min(1),
  /** Optional rejection reason */
  reason: z.string().optional(),
});

export type RequestReject = z.infer<typeof RequestRejectSchema>;
