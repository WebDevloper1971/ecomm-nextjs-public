"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
type SubmitButtonProps = {
  children: React.ReactNode;
  classname?: string;
} & ComponentProps<"button">;
// component props makes it possible to have all the button props available

const SubmitButton = ({ children, className, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`my-button ${className}`}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default SubmitButton;
