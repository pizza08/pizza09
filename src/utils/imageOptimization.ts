
export const optimizeImageUrl = (src: string, width?: number, height?: number): string => {
  // Se for uma imagem do Unsplash, adiciona parâmetros de otimização
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', '80'); // Qualidade 80%
    url.searchParams.set('fm', 'webp'); // Formato WebP
    return url.toString();
  }
  
  return src;
};

export const getImageSrcSet = (src: string, sizes: number[]): string => {
  return sizes
    .map(size => `${optimizeImageUrl(src, size)} ${size}w`)
    .join(', ');
};

export const getImageSizes = (): string => {
  return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
};
