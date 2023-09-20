import * as z from "zod";

export const RegisterValidatorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be 6 characters or more" }),
});

export type RegisterValidatorType = z.infer<typeof RegisterValidatorSchema>;
