
import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useLazyLoading = (options: UseLazyLoadingOptions = {}) => {
  const { threshold = 0.1, rootMargin = '50px' } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return { ref, isIntersecting, hasLoaded };
};

export const useLazyImage = (src: string, options?: UseLazyLoadingOptions) => {
  const { ref, isIntersecting } = useLazyLoading(options);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageSrc = isIntersecting ? src : undefined;

  const handleLoad = () => setImageLoaded(true);
  const handleError = () => setImageError(true);

  return {
    ref,
    src: imageSrc,
    isLoading: isIntersecting && !imageLoaded && !imageError,
    isLoaded: imageLoaded,
    hasError: imageError,
    onLoad: handleLoad,
    onError: handleError
  };
};
