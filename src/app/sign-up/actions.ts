"use server";

import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
// import { formatZodError, signUpSchema } from "@/lib/helper/zod";

export async function addUser(formData: FormData) {
  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !email || !password) {
    return { message: "Please fill all fields properly", status: "400" };
  }
  // const { username, email, password } = await signUpSchema
  //   .parseAsync(data)
  //   .catch((err) => {
  //     return { message: formatZodError(err), status: 400 };
  //   });

  console.log(username, email, password);

  const hashedPassword = await bcrypt.hash(password, 12);
  const user_limit = 10;
  const user_count = await prisma.user.count();

  const uniqueEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (uniqueEmail) {
    return { message: "Email Is Already Present", status: 400 };
  } else if (user_count >= user_limit) {
    return { message: "Signup Limit Reached [10 Users Max]", status: 400 };
  } else {
    await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });
    return { message: "Signed Up Successfully", status: 200 };
  }
}
