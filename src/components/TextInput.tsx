import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isBlur: boolean;
  errorMessage: string;
}

export default function TextInput({
  isBlur,
  errorMessage,
  ...props
}: TextFieldProps) {
  const isError = !!errorMessage;

  return (
    <div>
      <input {...props} />
      {isBlur && <p>{isError && errorMessage}</p>}
    </div>
  );
}
