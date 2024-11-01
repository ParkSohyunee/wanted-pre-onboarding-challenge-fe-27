import { LabelHTMLAttributes } from "react";

type LabelProps = {
  children: string;
  htmlFor: LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];
};

export default function Label({ children, ...props }: LabelProps) {
  return <label {...props}>{children}</label>;
}
