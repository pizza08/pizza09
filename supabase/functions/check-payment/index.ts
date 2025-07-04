
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

interface CheckPaymentRequest {
  paymentId: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { paymentId }: CheckPaymentRequest = await req.json()

    const abacateApiKey = Deno.env.get('ABACATE_PAY_API_KEY')
    if (!abacateApiKey) {
      throw new Error('ABACATE_PAY_API_KEY not configured')
    }

    console.log('Checking payment status for ID:', paymentId)

    // Verificar status do pagamento na Abacate Pay usando o endpoint correto
    const abacateResponse = await fetch(`https://api.abacatepay.com/v1/pixQrCode/check`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${abacateApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: paymentId
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

    const paymentData = responseData.data

    return new Response(
      JSON.stringify({
        success: true,
        status: paymentData.status,
        expiresAt: paymentData.expiresAt
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error checking payment status:', error)
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
