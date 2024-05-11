'use client'

import Image from 'next/image'
import Link from 'next/link'

interface PageSuccesPaymentProps {
  customerName: string
  productName: string
  imageProductUrl: string
}

const PageSuccessPayment = ({
  customerName,
  productName,
  imageProductUrl,
}: PageSuccesPaymentProps) => {
  return (
    <div className="mx-auto my-0 flex w-[100%] max-w-[1100px] flex-col items-center justify-center gap-8">
      <h1 className="pt-8 text-3xl font-bold">Compra efetuada!</h1>
      <Image
        src={imageProductUrl}
        alt=""
        width={260}
        height={240}
        className="mb-8 mt-8 rounded-lg bg-gradient-to-b
        from-green500 to-blue-500 object-cover"
      />
      <div className="flex flex-col items-center">
        <span className="text-xl font-normal">
          Uhull{' '}
          <strong className="text-xl font-semibold">{customerName}</strong>, sua{' '}
          <strong className="text-xl font-semibold">{productName}</strong>
        </span>
        <span className="text-xl font-normal">
          <strong className="text-xl font-semibold">Limits</strong> já está a
          caminho de sua casa
        </span>
      </div>
      <Link href={'/'} className="mt-8 text-xl font-semibold text-green300">
        Voltar ao catálogo
      </Link>
    </div>
  )
}

export default PageSuccessPayment
