'use client'

import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import { ChevronLeftIcon, ChevronRight, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { formatterPrice } from '@/lib/formatter'

import { Button } from './ui/button'

interface MainSliderProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

const MainSlider = ({ products }: MainSliderProps) => {
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slides: {
        origin: 'center',
        perView: 2,
        spacing: 48,
      },
      created() {
        setLoaded(true)
      },
    },
    [],
  )

  return (
    <>
      <main ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              id={product.id}
              className="keen-slider__slide group relative flex 
        items-center justify-center rounded-lg bg-gradient-to-b from-green500 to-blue-500 p-1"
            >
              <Image
                src={product.imageUrl}
                priority={true}
                width={520}
                height={480}
                alt=""
                className="object-cover"
              />
              <footer
                className="absolute bottom-0 left-1 right-1 flex translate-y-full items-center justify-between 
        rounded-md bg-slate-700 p-8 group-hover:bottom-1 group-hover:translate-y-0"
              >
                <div className="flex flex-col">
                  <strong className="text-xl">{product.name}</strong>
                  <span className="text-2xl font-bold text-green300">
                    {formatterPrice.format(product.price / 100)}
                  </span>
                </div>
                <Link href={`/product/${product.id}`}>
                  <Button>
                    <ShoppingBag />
                  </Button>
                </Link>
              </footer>
            </div>
          )
        })}
        {loaded && instanceRef.current && (
          <>
            <ChevronLeftIcon
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              size={60}
              className="absolute bottom-1/2"
            />

            <ChevronRight
              size={60}
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              className="absolute bottom-1/2 right-0"
            />
          </>
        )}
      </main>
    </>
  )
}

export default MainSlider
