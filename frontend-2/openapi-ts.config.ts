import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: `https://localhost:5001/openapi.json`,
  output: {
    format: 'prettier',
    path: 'src/api',
    lint: 'eslint',
  },
});
