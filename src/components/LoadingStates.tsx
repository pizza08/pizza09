
import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Loader2 } from 'lucide-react';

export const PizzaCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <Skeleton className="w-full h-48" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  </div>
);

export const MenuLoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
      <Skeleton className="h-12 w-64 mx-auto mb-4" />
      <Skeleton className="h-6 w-96 mx-auto" />
    </div>
    
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-32" />
        ))}
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <PizzaCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const CartLoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
    <span className="ml-2 text-gray-600">Adicionando ao carrinho...</span>
  </div>
);

export const ButtonLoading = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => (
  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors font-medium inline-flex items-center justify-center min-w-[120px]" disabled={isLoading}>
    {isLoading ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Carregando...
      </>
    ) : (
      children
    )}
  </button>
);
