import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// COMPOUND COMPONENT PATTERN

// >>>> 1) CREATE CONTEXT
const ModalContext = createContext();

// >>>> 2) CREATE ALL LOGIC IN PARENT COMPONENT
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}
// >>>> 3) CREATE CHILD COMPONENT
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  // HANDLE CLOSE MODEL WHEN CLICK OUTSIDE MODAL
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClick,true);
    //CLEAN UP USEEFFECT
    return () => document.removeEventListener("click", handleClick,true);
  }, [close]);

  if (name !== openName) return;

  // createPortal ===>>> for move component in virtual tree
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
      ;
    </Overlay>,
    document.body
  );
}
// >>>> 4) ADD CHILD COMPONENT AS PROPERTIES TO PARENT COMPONENT
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
