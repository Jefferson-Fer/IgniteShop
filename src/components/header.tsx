'use client'

import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { ShirtContext } from '@/app/context/shirts-context'

import Logo from '../assets/Logo.svg'
import ListCartModal from './list-cart-modal'
import { Dialog, DialogTrigger } from './ui/dialog'

export default function Header() {
  const { shirts } = useContext(ShirtContext)
  return (
    <header className="relative mx-auto my-0 flex w-[100%] max-w-[1100px] items-center justify-between px-0 py-8">
      <Link href={'/'}>
        <Image src={Logo} alt="Logo da aplicação" />
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center rounded-md bg-green500 hover:bg-green300">
            <ShoppingBag className="mr-2 p-1" size={32} />
            <strong className="absolute right-0 top-[30%] rounded-full bg-green300 px-1 text-sm">
              {shirts.length}
            </strong>
          </button>
        </DialogTrigger>

        <ListCartModal />
      </Dialog>
    </header>
  )
}
