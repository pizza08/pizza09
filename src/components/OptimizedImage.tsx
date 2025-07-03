
import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { optimizeImageUrl, getImageSrcSet, getImageSizes } from '../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: number[];
  lazy?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width,
  height,
  sizes = [320, 640, 1024],
  lazy = true
}: OptimizedImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
        <ImageOff className="w-12 h-12 mb-2" />
        <span className="text-sm">Imagem não disponível</span>
      </div>
    );
  }

  const optimizedSrc = optimizeImageUrl(src, width, height);
  const srcSet = getImageSrcSet(src, sizes);

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={getImageSizes()}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading={lazy ? 'lazy' : 'eager'}
        width={width}
        height={height}
      />
    </div>
  );
};

export default OptimizedImage;
