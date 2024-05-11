'use client'

import Image from 'next/image'
import { FormEvent, useContext } from 'react'

import { Button } from '@/components/ui/button'
import { formatterPrice } from '@/lib/formatter'

import { ShirtContext } from '../../context/shirts-context'

export interface ProductItemPageProps {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  priceId: string
}

const PageItemProduct = ({
  id,
  name,
  description,
  imageUrl,
  price,
  priceId,
}: ProductItemPageProps) => {
  const { shirts, handleNewShirtList } = useContext(ShirtContext)

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const infoProduct = {
      id,
      name,
      description,
      imageUrl,
      price,
      priceId,
    } as ProductItemPageProps

    let isCheckShirtList = false

    shirts.forEach((shirt) => {
      if (shirt.id === id) {
        isCheckShirtList = true
      }
    })

    if (isCheckShirtList) {
      alert('Camisa já adiconada')
    } else {
      handleNewShirtList(infoProduct)
    }
  }

  return (
    <div className="mx-auto my-0 grid min-h-[656px] w-[100%] max-w-[1100px] grid-cols-2 gap-8">
      <div
        className="flex items-center justify-center rounded-lg bg-gradient-to-b
        from-green500 to-blue-500 p-1"
      >
        <Image
          src={imageUrl}
          alt=""
          width={520}
          height={480}
          className="object-cover"
          priority={true}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl text-gray300">{name}</h1>
        <span className="mt-4 block text-3xl text-green300">
          {formatterPrice.format(price! / 100)}
        </span>
        <p className="mt-10 text-xl text-gray300">{description}</p>
        <form onSubmit={onSubmitHandle} className="mt-auto">
          <Button
            type="submit"
            className="mt-auto w-full rounded-lg border-0 p-8 text-xl font-bold"
          >
            Comprar agora
          </Button>
        </form>
      </div>
    </div>
  )
}

export default PageItemProduct
