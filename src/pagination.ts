import { z } from 'zod';

/**
 * Pagination query parameters
 */
export const PaginationParamsSchema = z.object({
  /** Page number (1-indexed) */
  page: z.number().int().positive().optional(),
  /** Number of items per page */
  limit: z.number().int().positive().max(100).optional(),
  /** Cursor for cursor-based pagination */
  cursor: z.string().optional(),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

/**
 * Pagination metadata for page-based pagination
 */
export const PaginationMetaSchema = z.object({
  /** Current page number */
  page: z.number().int().positive(),
  /** Items per page */
  limit: z.number().int().positive(),
  /** Total number of items */
  total: z.number().int().nonnegative(),
  /** Whether there are more pages */
  has_more: z.boolean(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

/**
 * Pagination metadata for cursor-based pagination
 */
export const CursorPaginationMetaSchema = z.object({
  /** Cursor for the next page */
  cursor: z.string().optional(),
  /** Whether there are more items */
  has_more: z.boolean(),
});

export type CursorPaginationMeta = z.infer<typeof CursorPaginationMetaSchema>;
