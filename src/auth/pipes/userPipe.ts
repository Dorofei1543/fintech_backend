import { z } from 'zod';

export const registerUserSchema = z
  .object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .required();

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
