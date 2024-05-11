import { redirect } from 'next/navigation'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

import PageSuccessPayment from './_components/pageSuccessPayment'

export type ParamsTypes = string | string[] | undefined

export interface SearchParamsTypes {
  searchParams: {
    [key: string]: ParamsTypes
  }
}

const Success = async ({ searchParams }: SearchParamsTypes) => {
  const sessionId = searchParams?.session_id as string

  if (!sessionId) {
    redirect('/')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name as string
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  const { name, images } = product

  return (
    <>
      <PageSuccessPayment
        customerName={customerName}
        productName={name}
        imageProductUrl={images[0]}
      />
    </>
  )
}

export default Success
