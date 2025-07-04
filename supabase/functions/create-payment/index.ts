
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

interface PaymentRequest {
  amount: number
  description: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  customerCPF: string
  orderId: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, description, customerName, customerPhone, customerEmail, customerCPF, orderId }: PaymentRequest = await req.json()

    const abacateApiKey = Deno.env.get('ABACATE_PAY_API_KEY')
    if (!abacateApiKey) {
      throw new Error('ABACATE_PAY_API_KEY not configured')
    }

    console.log('Creating PIX QR Code with data:', {
      amount,
      customerName,
      customerPhone,
      customerCPF,
      orderId
    })

    // Criar PIX QR Code na Abacate Pay usando o endpoint correto
    const abacateResponse = await fetch('https://api.abacatepay.com/v1/pixQrCode/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${abacateApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Converter para centavos
        expiresIn: 900, // 15 minutos
        description: description,
        customer: {
          name: customerName,
          cellphone: customerPhone.replace(/\D/g, ''), // Remove formatação
          email: customerEmail || `${customerPhone.replace(/\D/g, '')}@temp.com`, // Email obrigatório
          taxId: customerCPF.replace(/\D/g, '') // Remove formatação do CPF
        }
      })
    })

    if (!abacateResponse.ok) {
      const errorData = await abacateResponse.text()
      console.error('Abacate Pay error:', errorData)
      throw new Error(`Abacate Pay API error: ${abacateResponse.status} - ${errorData}`)
    }

    const responseData = await abacateResponse.json()
    console.log('Abacate Pay response:', responseData)

    if (responseData.error) {
      throw new Error(`Abacate Pay error: ${responseData.error}`)
    }

    const pixData = responseData.data

    return new Response(
      JSON.stringify({
        success: true,
        paymentId: pixData.id,
        qrCode: pixData.brCode,
        qrCodeImage: pixData.brCodeBase64,
        amount: pixData.amount / 100, // Converter de volta para reais
        status: pixData.status,
        expiresAt: pixData.expiresAt
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error creating PIX QR Code:', error)
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
