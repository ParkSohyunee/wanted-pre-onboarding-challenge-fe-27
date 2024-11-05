import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalPortalProps = {
  children: ReactNode;
};

export default function ModalPortal({ children }: ModalPortalProps) {
  const node = document.getElementById("portal") as Element;

  return createPortal(children, node);
}
