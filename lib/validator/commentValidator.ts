import * as z from "zod";

export const CommentValidatorSchema = z.object({
  body: z.string().nonempty().max(280),
});

export type CommentValidatorType = z.infer<typeof CommentValidatorSchema>;
