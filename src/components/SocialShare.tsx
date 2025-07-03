
import React, { useState } from 'react';
import { Share2, MessageCircle, Copy, Check } from 'lucide-react';

interface SocialShareProps {
  pizzaName: string;
  pizzaImage: string;
  pizzaPrice: number;
}

const SocialShare = ({ pizzaName, pizzaImage, pizzaPrice }: SocialShareProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🍕 Olha que pizza deliciosa! ${pizzaName} por apenas R$ ${pizzaPrice.toFixed(2).replace('.', ',')} na Forno Nobre!`;
  const shareUrl = window.location.href;

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Erro ao copiar link');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Compartilhar</span>
      </button>

      {showShareMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-10">
          <div className="space-y-2">
            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm">WhatsApp</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
              <span className="text-sm">
                {copied ? 'Copiado!' : 'Copiar Link'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
