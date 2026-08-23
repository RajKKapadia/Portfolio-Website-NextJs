import { z } from "zod"

export const personNameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be 100 characters or fewer")
  .refine((name) => !/\p{N}/u.test(name), {
    message: "Name cannot contain numbers",
  })
