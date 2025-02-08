"use server";

import { User } from "@prisma/client";
import { prisma } from "./lib/db/prisma";
import bcrypt from "bcryptjs";

interface MyAuth {
  user: User | null;
  status?: number;
}

export async function verifyUser(
  email: string,
  password: string,
): Promise<MyAuth> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (passwordMatch) {
      return {
        user: user,
        status: 200,
      };
    } else {
      return {
        user: user,
        status: 300,
      };
    }
  } else {
    return {
      user: null,
      status: 400,
    };
  }
}
