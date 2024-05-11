import Stripe from 'stripe'

import MainSlider from '@/components/main-slider'
import { stripe } from '@/lib/stripe'

const Home = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount!,
    }
  })

  return (
    <div className="mx-auto my-0 flex min-h-[656px] max-w-[1100px]">
      <MainSlider products={products} />
    </div>
  )
}

export default Home
