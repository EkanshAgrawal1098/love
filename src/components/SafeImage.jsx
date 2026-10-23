import { useState } from 'react';
import { Heart } from 'lucide-react';

// Resolves "images/x.jpg" against the site base so it works on any host or sub-folder.
export const asset = (p) => (p && !/^(https?:|data:|\/\/)/.test(p) ? `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}` : p);

export default function SafeImage({ src, alt, className = '', focus, eager = false }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt || 'Photo placeholder'}
        className={`flex items-center justify-center bg-gradient-to-br from-plum to-navy ${className}`}
      >
        <Heart className="h-8 w-8 text-blush/60" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}
