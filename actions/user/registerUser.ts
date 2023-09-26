"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export default async function registerUser(formData: FormData) {
  const schema = z.object({
    name: z.string().nonempty(),
    username: z.string().nonempty(),
    email: z.string().nonempty().email(),
    password: z.string().nonempty(),
  });

  const data = schema.parse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      return { message: "User already exist" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    return { message: "Register successfully" };
  } catch (error) {
    return { message: "Failed to register" };
  }
}
