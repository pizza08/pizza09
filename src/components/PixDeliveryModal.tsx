
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { QrCode, X } from 'lucide-react';

interface PixDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PixDeliveryData) => void;
  isLoading?: boolean;
}

export interface PixDeliveryData {
  name: string;
  phone: string;
  address: string;
  cpf: string;
}

const PixDeliveryModal = ({ isOpen, onClose, onConfirm, isLoading }: PixDeliveryModalProps) => {
  const [formData, setFormData] = useState<PixDeliveryData>({
    name: '',
    phone: '',
    address: '',
    cpf: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof PixDeliveryData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return value;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';

    // Validação de telefone
    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato inválido. Use: (11) 99999-9999';
    }

    // Validação básica de CPF
    if (formData.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'Formato inválido. Use: 000.000.000-00';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm(formData);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', address: '', cpf: '' });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-orange-500" />
            Dados para Pagamento PIX
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Seu nome completo"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone *
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF *
            </label>
            <Input
              value={formData.cpf}
              onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
              placeholder="000.000.000-00"
              className={errors.cpf ? 'border-red-500' : ''}
            />
            {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço Completo *
            </label>
            <Textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Rua, número, bairro, cidade, CEP"
              rows={3}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? (
                'Gerando...'
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Gerar PIX QR Code
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PixDeliveryModal;
