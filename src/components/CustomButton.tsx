import { ButtonHTMLAttributes } from "react";

type CustomButtonProps = {
  isError: boolean;
  children: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
};

export default function CustomButton({
  isError,
  children,
  type = "button",
  onClick,
}: CustomButtonProps) {
  return (
    <button type={type} disabled={isError} onClick={onClick}>
      {children}
    </button>
  );
}
