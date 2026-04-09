import { ComponentPropsWithoutRef } from 'react';

export const Input = ({ className, ...props }: ComponentPropsWithoutRef<'input'>) => {
    return (
        <input
            {...props}
            className={`border-2 border-gray-300 rounded px-3 py-2 outline-none focus:border-indigo-500 transition-all ${className}`}
        />
    );
};