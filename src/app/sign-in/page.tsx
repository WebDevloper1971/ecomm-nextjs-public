import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Signin - Vadanam",
};

async function SignIn() {
  const session = await auth();
  if (session?.user) {
    redirect("/cart");
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <form
        action={async (formData) => {
          "use server";
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;

          if (!password || !email) {
            redirect("/sign-in");
          }

          await signIn("credentials", formData);
          redirect("/cart");
        }}
        className="m-auto flex w-full max-w-[300px] flex-col gap-6"
      >
        <h1 className="my-8 text-3xl">Sign-in</h1>
        <label className="flex flex-col">
          Email
          <input
            className="my-inputs"
            name="email"
            type="email"
            autoComplete="on"
            required
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            className="my-inputs"
            name="password"
            type="password"
            autoComplete="on"
            required
          />
        </label>
        <button type="submit" className="my-button w-full">
          Sign In
        </button>
      </form>
      <h1 className="w-full text-center">OR</h1>

      <form
        className="my-button"
        action={async () => {
          "use server";
          await signIn("github");
          const session = await auth();
          if (session) {
            await prisma.user.create({
              data: {
                name: session.user.name as string,
                email: session.user.email as string,
                password: session.user.id as string,
              },
            });
          }
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
      <Link
        href={"/sign-up"}
        className="my-4 border-b border-black p-2 text-sm"
      >
        To Signup
      </Link>
    </div>
  );
}

export default SignIn;
