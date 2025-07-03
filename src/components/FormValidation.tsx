
import { z } from 'zod';

export const customerInfoSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  email: z.string().email('Email inválido'),
});

export const addressSchema = z.object({
  street: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  complement: z.string().optional(),
});

export const orderSchema = z.object({
  customer: customerInfoSchema,
  address: addressSchema,
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
  })).min(1, 'Carrinho não pode estar vazio'),
  total: z.number().min(0),
  paymentMethod: z.enum(['credit', 'debit', 'pix', 'cash']),
});

export type CustomerInfo = z.infer<typeof customerInfoSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Order = z.infer<typeof orderSchema>;
