import * as z from "zod";

export const CreatePostValidatorSchema = z.object({
  body: z
    .string()
    .nonempty({ message: "Post body is required" })
    .max(280, { message: "Must not exceed to 280 characters" }),
});

export type CreatePostValidatorType = z.infer<typeof CreatePostValidatorSchema>;
