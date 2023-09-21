import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterValidatorSchema } from "@/lib/validator/registerValidator";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, email, password } =
      RegisterValidatorSchema.parse(body);

    const userExist = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (userExist) {
      return new Response("User already exist", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid field values", { status: 409 });
    }

    return new Response("Internal Error", { status: 500 });
  }
}
