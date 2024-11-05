import { MouseEvent, ReactNode } from "react";

import ModalPortal from "./ModalPortal";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  /** 모달 외부 클릭하면 모달이 닫히는 함수 */
  const handleOutSideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalPortal>
      <div onClick={handleOutSideClick}>{children}</div>
    </ModalPortal>
  );
}
