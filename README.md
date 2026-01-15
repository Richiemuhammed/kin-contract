# @kin/contract

Shared API contract package between Kin backend and frontend. This package provides Zod schemas and TypeScript types for all API endpoints, ensuring type safety and runtime validation.

## Installation

### From GitHub (SSH)

```json
{
  "dependencies": {
    "@kin/contract": "git+ssh://git@github.com/YOUR_GITHUB_ORG/kin-contract.git"
  }
}
```

### From GitHub (HTTPS)

```json
{
  "dependencies": {
    "@kin/contract": "git+https://github.com/YOUR_GITHUB_ORG/kin-contract.git"
  }
}
```

Then run:
```bash
npm install
```

The `prepare` script will automatically build the package on install.

## Usage

### Frontend Usage

#### Import Types

```typescript
import type {
  Request,
  RequestWithKin,
  RequestCreate,
  CreateRequestRequest,
  CreateRequestResponse,
  GetRequestsResponse,
} from '@kin/contract';
```

#### Use Types in API Calls

```typescript
import type { CreateRequestRequest, CreateRequestResponse } from '@kin/contract';
import { CreateRequestRequestSchema, CreateRequestResponseSchema } from '@kin/contract';

async function createRequest(data: CreateRequestRequest): Promise<CreateRequestResponse> {
  const response = await fetch('/api/asks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const json = await response.json();
  
  // Optional: Validate response at runtime
  return CreateRequestResponseSchema.parse(json);
}
```

#### Validate Responses (Optional)

For runtime safety, you can validate API responses:

```typescript
import { safeParseResponse, GetRequestsResponseSchema } from '@kin/contract';

const response = await fetch('/api/asks');
const json = await response.json();

const result = safeParseResponse(GetRequestsResponseSchema, json);
if (result.success) {
  // Type-safe data
  console.log(result.data.data.requests);
} else {
  // Handle validation error
  console.error('Invalid response:', result.error);
}
```

### Backend Usage

#### Validate Incoming Requests

```typescript
import { CreateRequestRequestSchema, ErrorCode, createErrorResponse } from '@kin/contract';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = CreateRequestRequestSchema.parse(body);
    
    // Process request...
    const newRequest = await createRequest(validatedData);
    
    // Return success response
    return Response.json({
      ok: true,
      data: { request: newRequest },
      meta: {
        request_id: crypto.randomUUID(),
        server_time: new Date().toISOString(),
        version: '1.0.0',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation error
      return Response.json(
        createErrorResponse(
          ErrorCode.VALIDATION_ERROR,
          'Invalid request data',
          error.errors
        ),
        { status: 400 }
      );
    }
    
    // Other errors...
    throw error;
  }
}
```

#### Create Consistent Responses

```typescript
import { createSuccessResponse, createErrorResponse, ErrorCode } from '@kin/contract';

// Success response
const response = createSuccessResponse(
  { requests: [...] },
  {
    request_id: crypto.randomUUID(),
    server_time: new Date().toISOString(),
    version: '1.0.0',
  }
);

// Error response
const errorResponse = createErrorResponse(
  ErrorCode.NOT_FOUND,
  'Request not found',
  { request_id: '...' },
  meta
);
```

## Generating OpenAPI Spec

Generate OpenAPI 3.0 specification from the contract:

```bash
npm run generate:openapi
```

This will output the OpenAPI spec that can be used for:
- API documentation
- Client code generation
- API testing tools

## Enforcing Contract in CI

### Frontend CI

Validate that API responses match contract schemas:

```typescript
// tests/api-contract.test.ts
import { GetRequestsResponseSchema } from '@kin/contract';

test('GET /api/asks returns valid response', async () => {
  const response = await fetch('/api/asks');
  const json = await response.json();
  
  // This will throw if response doesn't match schema
  GetRequestsResponseSchema.parse(json);
});
```

### Backend CI

Validate that backend responses match contract:

```typescript
// tests/contract-compliance.test.ts
import { GetRequestsResponseSchema } from '@kin/contract';

test('GET /api/asks endpoint matches contract', async () => {
  const response = await fetch('http://localhost:3000/api/asks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const json = await response.json();
  
  // Ensure response matches contract
  expect(() => GetRequestsResponseSchema.parse(json)).not.toThrow();
});
```

## Response Format

All API responses follow this consistent format:

### Success Response

```typescript
{
  ok: true,
  data: T,  // Response data
  meta: {
    request_id: string,
    idempotency_key?: string,
    server_time: string,
    version: string,
  }
}
```

### Error Response

```typescript
{
  ok: false,
  error: {
    code: ErrorCode,
    message: string,
    details?: unknown,
  },
  meta: {
    request_id: string,
    server_time: string,
    version: string,
  }
}
```

## Error Codes

- `VALIDATION_ERROR` - Request validation failed (400)
- `UNAUTHORIZED` - Authentication required (401)
- `FORBIDDEN` - Insufficient permissions (403)
- `NOT_FOUND` - Resource not found (404)
- `CONFLICT` - Resource conflict (409)
- `RATE_LIMITED` - Rate limit exceeded (429)
- `INTERNAL_ERROR` - Server error (500)
- `SERVICE_UNAVAILABLE` - Service unavailable (503)
- `PAYMENT_ERROR` - Payment processing error
- `INSUFFICIENT_BALANCE` - Insufficient balance
- `IDEMPOTENCY_CONFLICT` - Idempotency key conflict

## Idempotency

All mutating operations support idempotency keys for safe retries:

- `POST /asks` - Create request
- `POST /asks/{id}/approve` - Approve request
- `POST /asks/{id}/reject` - Reject request
- `POST /payouts/execute` - Execute payout
- `POST /balance/topup/initiate` - Top up balance
- `POST /balance/withdraw/initiate` - Withdraw balance

Include `idempotency_key` in the request body. The backend will return the same response for duplicate requests with the same key.

## Versioning

The contract package is versioned independently. The `meta.version` field in responses indicates the API version. When making breaking changes:

1. Update the contract package version
2. Update `meta.version` in responses
3. Document migration guide
4. Support both versions during transition period

## Structure

```
kin-contract/
├── src/
│   ├── index.ts              # Main exports
│   ├── meta.ts               # Metadata schemas
│   ├── pagination.ts         # Pagination schemas
│   ├── errors.ts             # Error schemas
│   ├── domain/               # Domain models
│   │   ├── user.ts
│   │   ├── kin-member.ts
│   │   ├── request.ts
│   │   ├── payout.ts
│   │   ├── transaction.ts
│   │   └── ...
│   ├── routes/               # API route schemas
│   │   ├── auth.ts
│   │   ├── requests.ts
│   │   └── ...
│   ├── webhooks/             # Webhook schemas
│   │   ├── flutterwave.ts
│   │   └── stripe.ts
│   └── openapi.ts            # OpenAPI generation
├── dist/                     # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

When adding new endpoints:

1. Create domain models in `src/domain/` if needed
2. Create route schemas in `src/routes/`
3. Export from `src/index.ts`
4. Add to OpenAPI generation in `src/openapi.ts`
5. Update this README if needed
