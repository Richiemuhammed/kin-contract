import { z } from 'zod';
import { MetaSchema } from '../meta';
import { UserSchema } from '../domain/user';

/**
 * GET /me - Get current user
 * Auth via Bearer token in Authorization header
 */
export const GetMeResponseSchema = z.object({
  ok: z.literal(true),
  data: UserSchema,
  meta: MetaSchema,
});

export type GetMeResponse = z.infer<typeof GetMeResponseSchema>;
