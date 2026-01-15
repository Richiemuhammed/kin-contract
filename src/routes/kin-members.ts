import { z } from 'zod';
import { MetaSchema } from '../meta';
import {
  KinMemberSchema,
  KinMemberCreateSchema,
  KinMemberUpdateSchema,
} from '../domain/kin-member';

/**
 * GET /kin-members - Get all kin members
 */
export const GetKinMembersRequestSchema = z.object({
  /** Limit number of results */
  limit: z.number().int().positive().max(100).optional(),
});

export type GetKinMembersRequest = z.infer<typeof GetKinMembersRequestSchema>;

export const GetKinMembersResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    kin_members: z.array(KinMemberSchema),
  }),
  meta: MetaSchema,
});

export type GetKinMembersResponse = z.infer<typeof GetKinMembersResponseSchema>;

/**
 * POST /kin-members - Create kin member
 */
export const CreateKinMemberRequestSchema = KinMemberCreateSchema;

export type CreateKinMemberRequest = z.infer<typeof CreateKinMemberRequestSchema>;

export const CreateKinMemberResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    kin_member: KinMemberSchema,
  }),
  meta: MetaSchema,
});

export type CreateKinMemberResponse = z.infer<typeof CreateKinMemberResponseSchema>;

/**
 * PATCH /kin-members/{id} - Update kin member
 */
export const UpdateKinMemberRequestSchema = KinMemberUpdateSchema.extend({
  /** Kin member ID from path */
  id: z.string().uuid(),
});

export type UpdateKinMemberRequest = z.infer<typeof UpdateKinMemberRequestSchema>;

export const UpdateKinMemberResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({
    kin_member: KinMemberSchema,
  }),
  meta: MetaSchema,
});

export type UpdateKinMemberResponse = z.infer<typeof UpdateKinMemberResponseSchema>;

/**
 * DELETE /kin-members/{id} - Delete kin member
 */
export const DeleteKinMemberRequestSchema = z.object({
  /** Kin member ID from path */
  id: z.string().uuid(),
});

export type DeleteKinMemberRequest = z.infer<typeof DeleteKinMemberRequestSchema>;

export const DeleteKinMemberResponseSchema = z.object({
  ok: z.literal(true),
  data: z.object({}),
  meta: MetaSchema,
});

export type DeleteKinMemberResponse = z.infer<typeof DeleteKinMemberResponseSchema>;
