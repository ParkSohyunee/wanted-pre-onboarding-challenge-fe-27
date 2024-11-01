import { LabelHTMLAttributes } from "react";

type LabelProps = {
  children: string;
  htmlFor: LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];
};

export default function Label({ children, htmlFor }: LabelProps) {
  return <label htmlFor={htmlFor}>{children}</label>;
}
