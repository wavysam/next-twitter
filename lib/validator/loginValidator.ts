import * as z from "zod";

export const LoginValidatorSchema = z.object({
  email: z.string().nonempty({ message: "Field is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be 6 characters or more" }),
});

export type LoginValidatorType = z.infer<typeof LoginValidatorSchema>;
