import { ComponentPropsWithoutRef } from 'react';

export const Button = ({ className, children, ...props }: ComponentPropsWithoutRef<'button'>) => {
    return (
        <button
            {...props}
            className={`bg-gray-300 border-solid text-black font-semibold px-4 py-2 rounded hover:bg-indigo-700 active:transform active:scale-95 transition-all ${className}`}
        >
            {children}
        </button>
    );
};