// resources/js/components/ui/input-error.tsx

import { type HTMLAttributes } from 'react';

// Komponen ini menerima 'message' dan 'className' sebagai props
export function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & {
    message?: string;
}) {
    // Jika tidak ada pesan, jangan tampilkan apa-apa.
    // Jika ada pesan, tampilkan paragraf dengan teks error berwarna merah.
    return message ? (
        <p {...props} className={'text-sm text-red-600 dark:text-red-400 ' + className}>
            {message}
        </p>
    ) : null;
}