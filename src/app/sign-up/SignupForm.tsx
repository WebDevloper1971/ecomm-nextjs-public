"use client";

import Link from "next/link";
import { addUser } from "./actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface User {
  username: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(true);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (
      user.password.length > 7 &&
      user.email.length > 1 &&
      user.username.length > 1
    ) {
      setDisable(false);
      // console.log("use effect called");
    } else {
      setDisable(true);
    }
  }, [user]);
  const handleSignupForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      user.email.length < 1 ||
      user.password.length < 8 ||
      user.username.length < 1
    ) {
      toast.error("Please fill all fields properly");
    } else {
      const formData = new FormData();
      formData.set("username", user.username);
      formData.set("email", user.email);
      formData.set("password", user.password);

      const response = await addUser(formData);
      console.log(response);

      if (response.status === 200) {
        toast.success(response.message);
        redirect("/sign-in");
      } else {
        toast.error(response.message);
        setUser({ ...user, username: "", email: "", password: "" });
      }
    }
  };
  return (
    <div className="m-auto max-w-[300px] rounded-sm sm:p-4">
      <form
        onSubmit={handleSignupForm}
        className="my-12 flex w-full flex-col items-center gap-6"
      >
        <h1 className="my-4 w-full text-3xl">SignupForm</h1>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="my-inputs"
            name="username"
            id="username"
            placeholder="enter your username"
            required
            autoComplete="country-name"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="my-inputs"
            name="email"
            id="email"
            placeholder="enter valid email"
            required
            autoComplete="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="my-inputs"
            name="password"
            id="password"
            placeholder="password with 8 characters"
            required
            autoComplete="new-password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={pending || disable}
          className={`my-button mt-8 w-full ${disable ? "disabled" : ""} disabled:bg-slate-500`}
        >
          {pending && <span className="loading loading-spinner" />}
          Signup
        </button>

        <Link
          href={"/sign-in"}
          className="my-4 border-b border-black p-2 text-sm"
        >
          Go To Login
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
