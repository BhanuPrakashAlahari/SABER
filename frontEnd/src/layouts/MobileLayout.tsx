import type { ReactNode } from 'react';

interface MobileLayoutProps {
    children: ReactNode;
    className?: string; // Allow additional classes if needed
}

export const MobileLayout = ({ children, className = '' }: MobileLayoutProps) => {
    return (
        <div className="min-h-screen w-full bg-black flex justify-center">
            {/* Mobile Container Limit */}
            <div
                className={`w-full max-w-[480px] min-h-screen bg-black text-white shadow-2xl shadow-gray-900 overflow-x-hidden relative ${className}`}
            >
                {children}
            </div>
        </div>
    );
};
