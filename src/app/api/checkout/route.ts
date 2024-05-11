import { stripe } from '@/lib/stripe'

interface BodyType {
  priceId: string
}

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const body = (await request.json()) as BodyType

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: body.priceId,
        quantity: 1,
      },
    ],
  })
  return Response.json({
    checkoutUrl: checkoutSession.url,
  })
}

export default POST
