import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, MessageCircle, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeads } from '@/hooks/useLeads';
import { useToast } from '@/hooks/use-toast';
const Contact = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  });
  const {
    createLead,
    isLoading
  } = useLeads();
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createLead({
      ...formData,
      origem: 'pagina_contato'
    });
    if (result.success) {
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        mensagem: ''
      });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo 
            ou preencha o formulário e retornaremos em breve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  Telefone & WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">(47) 99280-9169</p>
                    <p className="text-gray-600">WhatsApp disponível 24h</p>
                  </div>
                  <Button onClick={() => window.open('https://wa.me/5547992809169', '_blank')} className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Conversar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Localização & Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">Forno Nobre Pizzaria</p>
                  <p className="text-gray-600">Shopping Balneário – Piso Térreo

 Av. Santa Catarina, 1 </p>
                  <p className="text-gray-600">– Balneário Camboriú/</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">🚚 Entregamos em toda Balneário Camboriú e região</p>
                  <p className="text-sm text-orange-700">
                    Frete GRÁTIS para pedidos acima de R$ 50
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Terça a Quinta:</span>
                    <span className="font-medium">18:00 - 23:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sexta e Sábado:</span>
                    <span className="font-medium">18:00 - 00:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="font-medium">18:00 - 23:00</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Aberto agora - Entrega em 30-45 minutos
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Avaliações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  Nossos Clientes Falam
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                    </div>
                    <span className="font-bold text-lg">4.8/5</span>
                    <span className="text-gray-600">•</span>
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">512+ avaliações</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm italic text-gray-700">
                      "Melhor pizza da região! Massa sequinha, ingredientes frescos e entrega sempre no prazo."
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Maria Silva</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Contato */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  Envie sua Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nome completo *
                    </label>
                    <Input name="nome" value={formData.nome} onChange={handleInputChange} required placeholder="Seu nome" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Telefone/WhatsApp *
                    </label>
                    <Input name="telefone" value={formData.telefone} onChange={handleInputChange} required placeholder="(47) 99999-9999" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      E-mail
                    </label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mensagem *
                    </label>
                    <Textarea name="mensagem" value={formData.mensagem} onChange={handleInputChange} required rows={4} placeholder="Como podemos ajudar você?" />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600">
                    {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Responderemos em até 2 horas durante nosso horário de funcionamento
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* CTA WhatsApp */}
            <Card className="mt-6 bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-green-800 mb-2">
                  Prefere falar direto conosco?
                </h3>
                <p className="text-green-700 mb-4">
                  Nosso WhatsApp está sempre disponível para pedidos e dúvidas!
                </p>
                <Button onClick={() => window.open('https://wa.me/5547992809169?text=Olá! Vim pela página de contato e gostaria de fazer um pedido 😊', '_blank')} className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Falar no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;