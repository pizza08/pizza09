
import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { usePaymentCheck } from '../hooks/usePaymentCheck';

interface PaymentQRCodeProps {
  paymentId: string;
  qrCode: string;
  qrCodeImage: string;
  amount: number;
  onPaymentConfirmed: () => void;
  onCancel: () => void;
}

const PaymentQRCode = ({ 
  paymentId, 
  qrCode, 
  qrCodeImage, 
  amount, 
  onPaymentConfirmed,
  onCancel 
}: PaymentQRCodeProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { checkPayment, isChecking } = usePaymentCheck();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      toast({
        title: "✅ Código PIX copiado!",
        description: "Cole no seu app do banco para efetuar o pagamento.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "❌ Erro ao copiar",
        description: "Não foi possível copiar o código PIX.",
        variant: "destructive",
      });
    }
  };

  const handleCheckPayment = async () => {
    const result = await checkPayment(paymentId);
    
    if (result.success) {
      if (result.status === 'PAID') {
        toast({
          title: "✅ Pagamento confirmado!",
          description: "Seu pagamento foi processado com sucesso.",
        });
        onPaymentConfirmed();
      } else if (result.status === 'PENDING') {
        toast({
          title: "⏳ Pagamento pendente",
          description: "Aguardando confirmação do pagamento...",
        });
      } else {
        toast({
          title: "ℹ️ Status do pagamento",
          description: `Status atual: ${result.status}`,
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border">
      <div className="text-center mb-6">
        <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <QrCode className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pagamento PIX
        </h2>
        <p className="text-lg font-semibold text-green-600">
          R$ {amount.toFixed(2).replace('.', ',')}
        </p>
      </div>

      {/* QR Code Image */}
      <div className="mb-6 text-center">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
          <img 
            src={qrCodeImage} 
            alt="QR Code PIX" 
            className="w-48 h-48 mx-auto"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Escaneie o QR Code com seu app do banco
        </p>
      </div>

      {/* PIX Code */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ou copie o código PIX:
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={qrCode}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
          />
          <Button
            onClick={copyToClipboard}
            variant="outline"
            size="sm"
            className="px-3"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Como pagar:</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Abra o app do seu banco</li>
          <li>Escaneie o QR Code ou copie o código PIX</li>
          <li>Confirme o pagamento</li>
          <li>Clique em "Verificar Pagamento" abaixo</li>
        </ol>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleCheckPayment}
          disabled={isChecking}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isChecking ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Verificando...
            </>
          ) : (
            'Verificar Pagamento'
          )}
        </Button>
        
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full"
        >
          Cancelar
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        ⏱️ Este QR Code expira em 15 minutos
      </p>
    </div>
  );
};

export default PaymentQRCode;
