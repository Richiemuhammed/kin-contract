import { z } from 'zod';

/**
 * Approval schema
 * Tracks separate approval records if approvals are tracked independently from request status
 */
export const ApprovalSchema = z.object({
  /** Approval ID (UUID) */
  id: z.string().uuid(),
  /** Request ID being approved */
  request_id: z.string().uuid(),
  /** Profile ID of user who approved */
  approver_profile_id: z.string().uuid(),
  /** Approval timestamp */
  approved_at: z.string().datetime(),
  /** Optional approval notes */
  notes: z.string().nullable(),
});

export type Approval = z.infer<typeof ApprovalSchema>;
