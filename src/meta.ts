import { z } from 'zod';

/**
 * Metadata included in all API responses
 */
export const MetaSchema = z.object({
  /** Unique request ID for tracing */
  request_id: z.string().uuid(),
  /** Idempotency key if provided in request */
  idempotency_key: z.string().optional(),
  /** Server timestamp in ISO 8601 format */
  server_time: z.string().datetime(),
  /** API version */
  version: z.string(),
});

export type Meta = z.infer<typeof MetaSchema>;
