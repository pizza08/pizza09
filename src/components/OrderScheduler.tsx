
import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ScheduleOption {
  id: string;
  label: string;
  value: string;
}

const OrderScheduler = () => {
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dateOptions: ScheduleOption[] = [
    { id: 'today', label: 'Hoje', value: today.toISOString().split('T')[0] },
    { id: 'tomorrow', label: 'Amanhã', value: tomorrow.toISOString().split('T')[0] },
  ];

  const timeOptions: ScheduleOption[] = [
    { id: '18:00', label: '18:00', value: '18:00' },
    { id: '18:30', label: '18:30', value: '18:30' },
    { id: '19:00', label: '19:00', value: '19:00' },
    { id: '19:30', label: '19:30', value: '19:30' },
    { id: '20:00', label: '20:00', value: '20:00' },
    { id: '20:30', label: '20:30', value: '20:30' },
    { id: '21:00', label: '21:00', value: '21:00' },
    { id: '21:30', label: '21:30', value: '21:30' },
    { id: '22:00', label: '22:00', value: '22:00' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-orange-500" />
        Agendamento de Entrega
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setScheduleType('now')}
            className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-colors ${
              scheduleType === 'now'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
            }`}
          >
            Entregar Agora
          </button>
          <button
            onClick={() => setScheduleType('later')}
            className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-colors ${
              scheduleType === 'later'
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
            }`}
          >
            Agendar Entrega
          </button>
        </div>
        
        {scheduleType === 'later' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Selecione a data</option>
                {dateOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horário
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={!selectedDate}
              >
                <option value="">Selecione o horário</option>
                {timeOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {scheduleType === 'later' && selectedDate && selectedTime && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center text-orange-800">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Seu pedido será entregue em{' '}
                <strong>
                  {dateOptions.find(d => d.value === selectedDate)?.label} às {selectedTime}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScheduler;
