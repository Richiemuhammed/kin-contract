import { z } from 'zod';
import { MetaSchema } from '../meta';
import {
  RequestSchema,
  RequestWithKinSchema,
  RequestCreateSchema,
  RequestApproveSchema,
  RequestRejectSchema,
  RequestStatusSchema,
} from '../domain/request';

/**
 * GET /asks - Get all requests
 */
export const GetRequestsRequestSchema = z.object({
  /** Limit number of results */
  limit: z.number().int().positive().max(100).optional(),
  /** Filter by status */
  status: RequestStatusSchema.optional(),
  /** Filter by kin member ID */
  kin_id: z.string().uuid().optional(),
});

export type GetRequestsRequest = z.infer<typeof GetRequestsRequestSchema>;

export const GetRequestsResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    requests: z.array(RequestWithKinSchema),
  }),
  meta: MetaSchema,
});

export type GetRequestsResponse = z.infer<typeof GetRequestsResponseSchema>;

/**
 * GET /asks/{id} - Get single request
 */
export const GetRequestRequestSchema = z.object({
  /** Request ID from path */
  id: z.string().uuid(),
});

export type GetRequestRequest = z.infer<typeof GetRequestRequestSchema>;

export const GetRequestResponseSchema = z.object({
  ok: z.literal(true),
  data: RequestWithKinSchema,
  meta: MetaSchema,
});

export type GetRequestResponse = z.infer<typeof GetRequestResponseSchema>;

/**
 * POST /asks - Create request
 */
export const CreateRequestRequestSchema = RequestCreateSchema.extend({
  /** Idempotency key for safe retries */
  idempotency_key: z.string().min(1).optional(),
});

export type CreateRequestRequest = z.infer<typeof CreateRequestRequestSchema>;

export const CreateRequestResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    request: RequestSchema,
  }),
  meta: MetaSchema,
});

export type CreateRequestResponse = z.infer<typeof CreateRequestResponseSchema>;

/**
 * POST /asks/{id}/approve - Approve request
 */
export const ApproveRequestRequestSchema = RequestApproveSchema.extend({
  /** Request ID from path */
  id: z.string().uuid(),
});

export type ApproveRequestRequest = z.infer<typeof ApproveRequestRequestSchema>;

export const ApproveRequestResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    request: RequestSchema,
  }),
  meta: MetaSchema,
});

export type ApproveRequestResponse = z.infer<typeof ApproveRequestResponseSchema>;

/**
 * POST /asks/{id}/reject - Reject request
 */
export const RejectRequestRequestSchema = RequestRejectSchema.extend({
  /** Request ID from path */
  id: z.string().uuid(),
});

export type RejectRequestRequest = z.infer<typeof RejectRequestRequestSchema>;

export const RejectRequestResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    request: RequestSchema,
  }),
  meta: MetaSchema,
});

export type RejectRequestResponse = z.infer<typeof RejectRequestResponseSchema>;
