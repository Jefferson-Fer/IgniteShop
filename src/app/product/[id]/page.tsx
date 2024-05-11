import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

import PageItemProduct from '../_components/pageProductItem'

interface ProductItemPageProps {
  params: {
    id: string
  }
}

const PageProduct = async ({ params }: ProductItemPageProps) => {
  const productItem = await stripe.products.retrieve(params.id, {
    expand: ['default_price'],
  })

  const priceItem = (productItem.default_price as Stripe.Price).unit_amount
  const priceId = (productItem.default_price as Stripe.Price).id
  const { id, name, description, images } = productItem

  return (
    <>
      <PageItemProduct
        id={id}
        name={name}
        description={description!}
        imageUrl={images[0]}
        price={priceItem!}
        priceId={priceId}
      />
    </>
  )
}

export default PageProduct
