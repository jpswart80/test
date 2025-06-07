import React from 'react';

/**
 * Button component from the design system.
 * Variants: primary, secondary, danger, disabled
 * Extend as needed for more variants/styles.
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  let base =
    'inline-flex items-center justify-center rounded-full font-semibold px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variants: Record<string, string> = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    disabled:
      'bg-gray-200 text-gray-400 cursor-not-allowed',
  };
  const isDisabled = props.disabled;
  const variantClass = isDisabled ? variants['disabled'] : variants[variant];
  return (
    <button
      className={`${base} ${variantClass} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 