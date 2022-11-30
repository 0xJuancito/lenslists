import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageWithFallback({
  fallbackImage = '/fallback.png',
  alt = '',
  src = '',
  ...props
}) {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      unoptimized
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src || fallbackImage}
      {...props}
    />
  );
}
