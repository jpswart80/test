import React from 'react';

/**
 * Checkbox component from the design system.
 * Supports label and error.
 */
export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, className = '', ...props }) => {
  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className={`form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
      {error && <span className="ml-2 text-xs text-red-500">{error}</span>}
    </label>
  );
};

export default Checkbox; 