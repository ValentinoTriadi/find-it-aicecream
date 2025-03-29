import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(5001),
  DATABASE_URL: z.string().url(),
  ALLOWED_ORIGINS: z
    .string()
    .default('["http://localhost:3000"]')
    .transform((value) => JSON.parse(value.replace(/\\/g, '')))
    .pipe(z.array(z.string().url())),
});

const result = EnvSchema.safeParse(process.env);
if (!result.success) {
  console.error('Invalid environment variables: ');
  console.error(result.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = result.data;
