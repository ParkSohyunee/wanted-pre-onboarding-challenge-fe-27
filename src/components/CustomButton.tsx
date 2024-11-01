import { ButtonHTMLAttributes } from "react";

type CustomButtonProps = {
  isError: boolean;
  children: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export default function CustomButton({
  isError,
  children,
  type = "button",
}: CustomButtonProps) {
  return (
    <button type={type} disabled={isError}>
      {children}
    </button>
  );
}
