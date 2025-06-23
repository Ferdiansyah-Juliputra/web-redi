import { ReactNode } from 'react';

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto px-4">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl my-8 p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
