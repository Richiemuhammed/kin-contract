import { z } from 'zod';

/**
 * User role enum
 */
export const UserRoleSchema = z.enum(['owner', 'dependent']);

export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * User/Profile schema
 */
export const UserSchema = z.object({
  /** User profile ID (UUID) */
  id: z.string().uuid(),
  /** User email */
  email: z.string().email(),
  /** User's full name */
  full_name: z.string().nullable(),
  /** User's role in household */
  role: UserRoleSchema,
  /** Household ID the user belongs to */
  household_id: z.string().uuid(),
  /** Profile avatar URL */
  avatar_url: z.string().url().nullable(),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
