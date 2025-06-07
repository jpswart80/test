import React from 'react';

/**
 * BottomSheet component from the design system.
 * Use for mobile/modal overlays. Extend as needed.
 */
export type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const BottomSheet: React.FC<BottomSheetProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg animate-slide-up">
        <button
          className="absolute top-2 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet; 