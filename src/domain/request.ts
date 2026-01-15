import { z } from 'zod';
import { KinMemberSchema } from './kin-member';

/**
 * Request status enum
 */
export const RequestStatusSchema = z.enum(['pending', 'approved', 'paid', 'rejected']);

export type RequestStatus = z.infer<typeof RequestStatusSchema>;

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
  /** Optional description */
  description: z.string().nullable(),
  /** Optional due date */
  due_date: z.string().datetime().nullable(),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
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
