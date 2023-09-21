import * as z from "zod";

export const EditProfileValidatorSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  bio: z.string().optional(),
  coverImage: z.string().optional(),
  profileImage: z.string().optional(),
});

export type EditProfileValidatorType = z.infer<
  typeof EditProfileValidatorSchema
>;
