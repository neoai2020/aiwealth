"use client";

import { useState } from "react";
import Image from "next/image";

interface SmartImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackUrl?: string;
}

export function SmartImage({ src, alt, className, fallbackUrl }: SmartImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [errorOccurred, setErrorOccurred] = useState(false);

    const handleError = () => {
        if (!errorOccurred) {
            setImgSrc(fallbackUrl || `https://placehold.co/1200x800/10b981/ffffff?text=${encodeURIComponent(alt || 'Product')}`);
            setErrorOccurred(true);
        }
    };

    return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
}
