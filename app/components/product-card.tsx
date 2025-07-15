import Image from 'next/image'

type ProductCardProps = {
  photo: string
  name: string
  price: string | number
  ordersClick?: () => void
}

export const ProductCard = ({
  photo,
  name,
  price,
  ordersClick,
}: ProductCardProps) => {
  return (
    <div
      className="w-full flex relative justify-center items-center shadow-[0px_5px_15px_0px_#0000000D] cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-200 ease-in-out"
      onClick={ordersClick}>
      {/* Top-left corner */}
      <div className="absolute top-0 left-0 w-[10px] h-[10px] border-t-[0.5px] border-l-[0.5px] border-[#FB9E3A]"></div>

      {/* Top-right corner */}
      <div className="absolute top-0 right-0 w-[10px] h-[10px] border-t-[0.5px] border-r-[0.5px] border-[#FB9E3A]"></div>

      {/* Bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-[10px] h-[10px] border-b-[0.5px] border-l-[0.5px] border-[#FB9E3A]"></div>

      {/* Bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-[10px] h-[10px] border-b-[0.5px] border-r-[0.5px] border-[#FB9E3A]"></div>

      <div className="w-[110px]">
        <div className="space-y-[15px]">
          <div className="w-[110px] h-[110px] relative overflow-hidden flex items-center justify-center">
            <Image
              src= {photo || '/logo.svg'} 
              width={110}
              height={110}
              alt="Product Image"
              className="object-contain"
            />
          </div>
          <div className="space-y-[15px] pb-[15px]">
            <p className="text-xs md:text-sm lg:text-[16px] leading-[24px] font-normal text-center truncate">
              {name}
            </p>
            <h3 className="text-xs md:text-sm lg:text-[16px] leading-[24px] font-extrabold text-center text-[#000000]">
              {price} MMK
            </h3>
          </div>
        </div>
      </div>
      
      {/* Add to cart indicator on hover */}
      <div className="absolute top-3 right-3 w-6 h-6 bg-[#FB9E3A] rounded-full flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0
                      transition-all duration-300">
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>
  )
}
