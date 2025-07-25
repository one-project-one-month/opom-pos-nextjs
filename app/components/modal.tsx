import { X } from 'lucide-react';
import { ReactNode, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type ModalProps = {
  className?: string;
  children: ReactNode;
  onClose: () => void; // Changed from MouseEventHandler to more general function type
};

function Modal({ children, className, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalClassName = twMerge(
    'w-[500px] max-h-[90vh] bg-white rounded-xl p-7 relative z-50 flex flex-col',
    className
  );

  // Handle click outside and Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listeners when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className="w-screen h-screen top-0 right-0 fixed z-50 bg-black/30 flex items-center justify-center">
      <div ref={modalRef} className={modalClassName}>
        <button
          type="button"
          className="absolute top-5 right-5 cursor-pointer hover:opacity-50"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
