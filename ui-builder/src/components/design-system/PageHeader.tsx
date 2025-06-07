import React from 'react';

/**
 * PageHeader component from the design system.
 * Use for page titles and optional actions.
 */
export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // For actions or extra content
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
  return (
    <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children && <div className="mt-2 md:mt-0">{children}</div>}
    </div>
  );
};

export default PageHeader; 