import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';
import { serve } from 'bun';
import { describeRoute, openAPISpecs } from 'hono-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { env } from './configs/env.config';

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ errors: result.error.flatten() }, 400);
    }
  },
});

app.use(logger());

app.get('/', (c) => c.json({ message: 'Server runs successfully' }));

app.use(
  '/api/*',
  describeRoute({
    validateResponse: true,
  }),
  cors({
    credentials: true,
    origin: env.ALLOWED_ORIGINS,
  }),
);

// app.route('/api', apiRouter);

app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: {
    version: '1.0',
    title: 'BattleTalk Project API Documentation',
  },
  tags: [{ name: 'user', description: 'User API' }],
});

app.get(
  '/docs',
  apiReference({
    theme: 'saturn',
    url: '/openapi.json',
  }),
);

app.get(
  '/openapi',
  openAPISpecs(app, {
    documentation: {
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  }),
);

export const server = serve({
  fetch: app.fetch,
  port: env.PORT,
});

console.log(`Server is running on port ${env.PORT}`); // eslint-disable-line no-console

server;
