import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { ModalProviderProp, ModalProps } from '../../module';

const ModalContext = React.createContext(null);

export function ModalProvider({ children }: ModalProviderProp) {
  const modalRef = useRef(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }: ModalProps): React.ReactPortal | null {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
