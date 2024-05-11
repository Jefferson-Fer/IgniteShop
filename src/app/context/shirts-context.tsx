'use client'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface Shirt {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  priceId: string
}

interface ShirtContextType {
  shirts: Shirt[]
  handleNewShirtList: (shirtItem: Shirt) => void
  handleRemoveShirtList: (shirtIdRemove: string) => void
}

interface ShirtContextProviderProps {
  children: ReactNode
}

export const ShirtContext = createContext({} as ShirtContextType)

export function ShirtContextProvider({ children }: ShirtContextProviderProps) {
  const [shirts, setShirts] = useState<Shirt[]>(() => {
    if (typeof window !== 'undefined') {
      const listShirts = localStorage.getItem(
        '@project-ignite-shop:shirts-1.0.0',
      )
      if (listShirts) {
        return JSON.parse(listShirts)
      }
    }

    return []
  })

  const handleNewShirtList = useCallback((shirtItem: Shirt) => {
    setShirts((state) => [...state, shirtItem])
  }, [])

  const handleRemoveShirtList = (shirtIdRemove: string) => {
    const shirtsWithoutDeleteOne = shirts.filter((shirt) => {
      return shirt.id !== shirtIdRemove
    })

    setShirts(shirtsWithoutDeleteOne)
  }

  useEffect(() => {
    localStorage.setItem(
      '@project-ignite-shop:shirts-1.0.0',
      JSON.stringify(shirts),
    )
  }, [shirts])

  return (
    <ShirtContext.Provider
      value={{ shirts, handleNewShirtList, handleRemoveShirtList }}
    >
      {children}
    </ShirtContext.Provider>
  )
}
