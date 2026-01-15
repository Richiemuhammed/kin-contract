import { z } from 'zod';
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { ErrorResponseSchema, ErrorCode } from './errors';
import { MetaSchema } from './meta';
import * as AuthRoutes from './routes/auth';
import * as OverviewRoutes from './routes/overview';
import * as RequestRoutes from './routes/requests';
import * as PayoutRoutes from './routes/payouts';
import * as KinMemberRoutes from './routes/kin-members';
import * as LedgerRoutes from './routes/ledger';
import * as BalanceRoutes from './routes/balance';
import * as SubscriptionRoutes from './routes/subscription';

/**
 * Generate OpenAPI 3.0 specification from Zod schemas
 */
export function generateOpenAPISpec() {
  const registry = new OpenAPIRegistry();

  // Register common schemas
  registry.register('Meta', MetaSchema);
  registry.register('ErrorResponse', ErrorResponseSchema);

  // Security scheme
  registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Supabase JWT token',
  });

  // Auth routes
  registry.registerPath({
    method: 'get',
    path: '/me',
    summary: 'Get current user',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'Current user',
        content: {
          'application/json': {
            schema: AuthRoutes.GetMeResponseSchema,
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: ErrorResponseSchema,
          },
        },
      },
    },
  });

  // Overview routes
  registry.registerPath({
    method: 'get',
    path: '/overview',
    summary: 'Get dashboard overview',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'Overview data',
        content: {
          'application/json': {
            schema: OverviewRoutes.GetOverviewResponseSchema,
          },
        },
      },
    },
  });

  // Request routes
  registry.registerPath({
    method: 'get',
    path: '/asks',
    summary: 'Get all requests',
    security: [{ bearerAuth: [] }],
    request: {
      query: RequestRoutes.GetRequestsRequestSchema,
    },
    responses: {
      200: {
        description: 'List of requests',
        content: {
          'application/json': {
            schema: RequestRoutes.GetRequestsResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/asks/{id}',
    summary: 'Get single request',
    security: [{ bearerAuth: [] }],
    request: {
      params: RequestRoutes.GetRequestRequestSchema,
    },
    responses: {
      200: {
        description: 'Request details',
        content: {
          'application/json': {
            schema: RequestRoutes.GetRequestResponseSchema,
          },
        },
      },
      404: {
        description: 'Request not found',
        content: {
          'application/json': {
            schema: ErrorResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/asks',
    summary: 'Create request',
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: RequestRoutes.CreateRequestRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Request created',
        content: {
          'application/json': {
            schema: RequestRoutes.CreateRequestResponseSchema,
          },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: ErrorResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/asks/{id}/approve',
    summary: 'Approve request',
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({ id: z.string().uuid() }),
      body: {
        content: {
          'application/json': {
            schema: RequestRoutes.ApproveRequestRequestSchema.omit({ id: true }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Request approved',
        content: {
          'application/json': {
            schema: RequestRoutes.ApproveRequestResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/asks/{id}/reject',
    summary: 'Reject request',
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({ id: z.string().uuid() }),
      body: {
        content: {
          'application/json': {
            schema: RequestRoutes.RejectRequestRequestSchema.omit({ id: true }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Request rejected',
        content: {
          'application/json': {
            schema: RequestRoutes.RejectRequestResponseSchema,
          },
        },
      },
    },
  });

  // Payout routes
  registry.registerPath({
    method: 'post',
    path: '/payouts/execute',
    summary: 'Execute payout',
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: PayoutRoutes.ExecutePayoutRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Payout executed',
        content: {
          'application/json': {
            schema: PayoutRoutes.ExecutePayoutResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/payouts',
    summary: 'Get payouts',
    security: [{ bearerAuth: [] }],
    request: {
      query: PayoutRoutes.GetPayoutsRequestSchema,
    },
    responses: {
      200: {
        description: 'List of payouts',
        content: {
          'application/json': {
            schema: PayoutRoutes.GetPayoutsResponseSchema,
          },
        },
      },
    },
  });

  // Kin member routes
  registry.registerPath({
    method: 'get',
    path: '/kin-members',
    summary: 'Get all kin members',
    security: [{ bearerAuth: [] }],
    request: {
      query: KinMemberRoutes.GetKinMembersRequestSchema,
    },
    responses: {
      200: {
        description: 'List of kin members',
        content: {
          'application/json': {
            schema: KinMemberRoutes.GetKinMembersResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/kin-members',
    summary: 'Create kin member',
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: KinMemberRoutes.CreateKinMemberRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Kin member created',
        content: {
          'application/json': {
            schema: KinMemberRoutes.CreateKinMemberResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'patch',
    path: '/kin-members/{id}',
    summary: 'Update kin member',
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({ id: z.string().uuid() }),
      body: {
        content: {
          'application/json': {
            schema: KinMemberRoutes.UpdateKinMemberRequestSchema.omit({ id: true }),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Kin member updated',
        content: {
          'application/json': {
            schema: KinMemberRoutes.UpdateKinMemberResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/kin-members/{id}',
    summary: 'Delete kin member',
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({ id: z.string().uuid() }),
    },
    responses: {
      200: {
        description: 'Kin member deleted',
        content: {
          'application/json': {
            schema: KinMemberRoutes.DeleteKinMemberResponseSchema,
          },
        },
      },
    },
  });

  // Ledger routes
  registry.registerPath({
    method: 'get',
    path: '/ledger',
    summary: 'Get ledger/transactions',
    security: [{ bearerAuth: [] }],
    request: {
      query: LedgerRoutes.GetLedgerRequestSchema,
    },
    responses: {
      200: {
        description: 'List of transactions',
        content: {
          'application/json': {
            schema: LedgerRoutes.GetLedgerResponseSchema,
          },
        },
      },
    },
  });

  // Balance routes
  registry.registerPath({
    method: 'post',
    path: '/balance/topup/initiate',
    summary: 'Initiate balance top-up',
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: BalanceRoutes.TopupInitiateRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Top-up initiated',
        content: {
          'application/json': {
            schema: BalanceRoutes.TopupInitiateResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/balance/withdraw/initiate',
    summary: 'Initiate balance withdrawal',
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: BalanceRoutes.WithdrawInitiateRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Withdrawal initiated',
        content: {
          'application/json': {
            schema: BalanceRoutes.WithdrawInitiateResponseSchema,
          },
        },
      },
    },
  });

  // Subscription routes
  registry.registerPath({
    method: 'get',
    path: '/subscription',
    summary: 'Get current subscription',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'Subscription details',
        content: {
          'application/json': {
            schema: SubscriptionRoutes.GetSubscriptionResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/subscription/checkout',
    summary: 'Create subscription checkout session',
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: SubscriptionRoutes.SubscriptionCheckoutRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Checkout session created',
        content: {
          'application/json': {
            schema: SubscriptionRoutes.SubscriptionCheckoutResponseSchema,
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/subscription/portal',
    summary: 'Get subscription management portal URL',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'Portal URL',
        content: {
          'application/json': {
            schema: SubscriptionRoutes.SubscriptionPortalResponseSchema,
          },
        },
      },
    },
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Kin API',
      version: '1.0.0',
      description: 'API contract for Kin family obligation management app',
    },
    servers: [
      {
        url: 'https://api.mykin.app',
        description: 'Production',
      },
    ],
  });
}
