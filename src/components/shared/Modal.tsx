import { useRef } from "react";
import styled from "styled-components";

const Overlay = styled.div<{ $active?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: 0.4s;
  opacity: ${(props) => (props.$active ? "1" : "0")};
  visibility: ${(props) => (props.$active ? "visible" : "hidden")};
`;

interface IProps {
  active: boolean;
  children?: React.ReactNode;
  modalClose: () => void;
}

const Modal = ({ active, children, modalClose }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalOutSideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current === e.target) {
      modalClose();
    }
  };
  return (
    <Overlay
      $active={active}
      ref={modalRef}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        modalOutSideClick(e)
      }
    >
      {children}
    </Overlay>
  );
};

export default Modal;
