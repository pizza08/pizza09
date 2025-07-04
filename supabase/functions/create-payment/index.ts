
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface PaymentRequest {
  amount: number
  description: string
  customerName: string
  customerPhone: string
  orderId: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, description, customerName, customerPhone, orderId }: PaymentRequest = await req.json()

    const abacateApiKey = Deno.env.get('ABACATE_PAY_API_KEY')
    if (!abacateApiKey) {
      throw new Error('ABACATE_PAY_API_KEY not configured')
    }

    // Criar cobrança na Abacate Pay
    const abacateResponse = await fetch('https://api.abacatepay.com/v1/billing', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${abacateApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        frequency: 'once',
        methods: ['PIX'],
        amount: Math.round(amount * 100), // Converter para centavos
        description: description,
        customer: {
          name: customerName,
          cellphone: customerPhone.replace(/\D/g, ''), // Remove formatação
        },
        metadata: {
          orderId: orderId
        }
      })
    })

    if (!abacateResponse.ok) {
      const errorData = await abacateResponse.text()
      console.error('Abacate Pay error:', errorData)
      throw new Error(`Abacate Pay API error: ${abacateResponse.status}`)
    }

    const paymentData = await abacateResponse.json()

    return new Response(
      JSON.stringify({
        success: true,
        paymentId: paymentData.id,
        qrCode: paymentData.pix_qr_code,
        qrCodeImage: paymentData.pix_qr_code_image,
        amount: paymentData.amount / 100, // Converter de volta para reais
        status: paymentData.status
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error creating payment:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
