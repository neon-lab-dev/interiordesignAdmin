import React, { useEffect, useRef, ReactNode } from "react";
import { ICONS } from "../../assets"; // Adjust the path to the correct location

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean; // Optional prop to control close button visibility
}

const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true, // Default to true if not specified
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable background scroll
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-10">
      <div ref={modalRef} className="bg-primary-20 p-6 rounded-lg shadow-lg relative w-fit h-[570px] overflow-y-auto">
        {showCloseButton && (
          <button onClick={onClose} className="absolute top-2 right-2 bg-transparent">
            <img src={ICONS.close} alt="Close" className="h-3 w-3" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default PopupModal;
