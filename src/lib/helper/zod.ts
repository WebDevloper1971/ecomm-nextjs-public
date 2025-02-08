import { object, string } from "zod";
import { ZodError, ZodIssue } from "zod";

export const signUpSchema = object({
  username: string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .min(5, "Username must be greater than 8 letters")
    .max(15, "Username must be less than 15 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$"), {
      message:
        "Password must be 8 - 15 characters and contain an uppercase letter, lowercase letter, a symbol and number",
    }),
});

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join(".");

  return `${pathString}: ${message}`;
};

// Format the Zod error message with only the current error
export const formatZodError = (error: ZodError): string => {
  const { issues } = error;

  if (issues.length) {
    const currentIssue = issues[0];
    return formatZodIssue(currentIssue);
  }
  throw new Error("Invalid Credentials");
};
