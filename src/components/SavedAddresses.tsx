
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  isDefault: boolean;
}

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Casa',
      street: 'Rua das Flores, 123',
      number: '123',
      neighborhood: 'Centro',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Trabalho',
      street: 'Av. Paulista, 1000',
      number: '1000',
      neighborhood: 'Bela Vista',
      complement: 'Sala 201',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
  });

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.street && newAddress.number && newAddress.neighborhood) {
      const address: Address = {
        id: Date.now().toString(),
        ...newAddress,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, address]);
      setNewAddress({ label: '', street: '', number: '', neighborhood: '', complement: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-orange-500" />
          Endereços Salvos
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-orange-500 hover:text-orange-600 flex items-center text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-1" />
          Adicionar
        </button>
      </div>

      {/* Lista de endereços */}
      <div className="space-y-3 mb-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 border rounded-lg transition-colors ${
              address.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-gray-800">{address.label}</span>
                  {address.isDefault && (
                    <span className="ml-2 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                      Padrão
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {address.street}, {address.number}
                  {address.complement && ` - ${address.complement}`}
                </p>
                <p className="text-gray-500 text-sm">{address.neighborhood}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-gray-400 hover:text-orange-500 text-xs"
                  >
                    Definir como padrão
                  </button>
                )}
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de adicionar endereço */}
      {showAddForm && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Novo Endereço</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nome do endereço (Casa, Trabalho, etc.)"
              value={newAddress.label}
              onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Rua"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Número"
                value={newAddress.number}
                onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Bairro"
                value={newAddress.neighborhood}
                onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Complemento (opcional)"
                value={newAddress.complement}
                onChange={(e) => setNewAddress({ ...newAddress, complement: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddAddress}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Salvar Endereço
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedAddresses;
