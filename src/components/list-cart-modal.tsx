'use client'

import axios from 'axios'
import Image from 'next/image'
import { FormEvent, useContext, useState } from 'react'

import { ShirtContext } from '@/app/context/shirts-context'
import { formatterPrice } from '@/lib/formatter'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from './ui/dialog'

const ListCartModal = () => {
  const { shirts, handleRemoveShirtList } = useContext(ShirtContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const summary = shirts.reduce(
    (acc, shirt) => {
      acc.quantity += 1
      acc.total += shirt.price
      return acc
    },
    { quantity: 0, total: 0 },
  )

  const onSubmitHandle = (
    e: FormEvent<HTMLFormElement>,
    shirtIdRemove: string,
  ) => {
    e.preventDefault()
    handleRemoveShirtList(shirtIdRemove)
  }

  const onSubmitHandleShoppingList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const auxListPriceId = shirts.map((shirt) => {
      return shirt.priceId
    })

    try {
      console.log(auxListPriceId)
      const priceId = auxListPriceId[0]
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId,
      })

      if (response.data) {
        const { checkoutUrl } = response.data

        window.location.href = checkoutUrl
      }
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pt-8 text-2xl tracking-tight">
            Sacola de compras
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between gap-8">
          {shirts.map((shirt) => {
            return (
              <div key={shirt.id} className="flex gap-8">
                <div className="rounded-lg bg-gradient-to-b from-green500 to-blue-500 p-1">
                  <Image
                    src={shirt.imageUrl}
                    alt=""
                    priority={true}
                    width={90}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span>{shirt.name}</span>
                  <strong>{formatterPrice.format(shirt.price / 100)}</strong>
                  <form onSubmit={(e) => onSubmitHandle(e, shirt.id)}>
                    <Button variant={'outlide'}>Remover</Button>
                  </form>
                </div>
              </div>
            )
          })}
          <div className="flex flex-col gap-3">
            <p className="flex items-center justify-between">
              <span className="text-sm">Quantidade</span>
              <span className="text-sm">
                {summary.quantity} {summary.quantity > 1 ? ' items' : ' item'}
              </span>
            </p>
            <p className="mb-6 flex items-center justify-between">
              <span className="text-xl font-medium">Valor total</span>
              <span className="text-xl font-medium">
                {formatterPrice.format(summary.total / 100)}
              </span>
            </p>
            <form onSubmit={onSubmitHandleShoppingList}>
              <Button
                type="submit"
                disabled={isCreatingCheckoutSession || shirts.length < 1}
                className="w-full py-5 text-xl font-bold disabled:cursor-not-allowed disabled:opacity-60"
              >
                Finalizar compra
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  )
}

export default ListCartModal
