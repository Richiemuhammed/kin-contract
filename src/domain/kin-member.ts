import { z } from 'zod';

/**
 * Relationship type enum
 */
export const RelationshipSchema = z.enum(['spouse', 'parent', 'child', 'sibling', 'other']);

export type Relationship = z.infer<typeof RelationshipSchema>;

/**
 * Kin member schema
 */
export const KinMemberSchema = z.object({
  /** Kin member ID (UUID) */
  id: z.string().uuid(),
  /** Household ID */
  household_id: z.string().uuid(),
  /** Display name */
  display_name: z.string(),
  /** Relationship to owner */
  relationship: RelationshipSchema,
  /** Profile ID of user who added this kin member */
  added_by_profile_id: z.string().uuid(),
  /** Linked profile ID if kin member has an account */
  linked_profile_id: z.string().uuid().nullable(),
  /** First name */
  first_name: z.string(),
  /** Last name */
  last_name: z.string(),
  /** Email address */
  email: z.string().email(),
  /** Profile photo URL */
  profile_url: z.string().url().nullable(),
  /** Created timestamp */
  created_at: z.string().datetime(),
  /** Updated timestamp */
  updated_at: z.string().datetime(),
});

export type KinMember = z.infer<typeof KinMemberSchema>;

/**
 * Schema for creating a kin member
 */
export const KinMemberCreateSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  relationship: RelationshipSchema,
  profile_url: z.string().url().nullable().optional(),
});

export type KinMemberCreate = z.infer<typeof KinMemberCreateSchema>;

/**
 * Schema for updating a kin member
 */
export const KinMemberUpdateSchema = z.object({
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  relationship: RelationshipSchema.optional(),
  profile_url: z.string().url().nullable().optional(),
});

export type KinMemberUpdate = z.infer<typeof KinMemberUpdateSchema>;
