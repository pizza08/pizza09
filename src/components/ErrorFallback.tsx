
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  message?: string;
}

const ErrorFallback = ({ 
  error, 
  resetError, 
  message = "Ocorreu um erro inesperado" 
}: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    resetError?.();
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ops! Algo deu errado
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {error && process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-gray-700 font-mono">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={handleReload}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
