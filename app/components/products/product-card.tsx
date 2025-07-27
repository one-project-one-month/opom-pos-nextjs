import Image from 'next/image'

type ProductCardProps = {
  photo: string
  name: string
  price: string | number
  discount: string | number
  stock?: number
  ordersClick?: () => void
}

export const ProductCard = ({
  photo,
  name,
  price,
  discount,
  stock,
  ordersClick,
}: ProductCardProps) => {
  
  let imageSrc = '/logo.svg';
  if (typeof photo === 'string' && photo.trim() !== '') {
    if (photo.startsWith('http://') || photo.startsWith('https://') || photo.startsWith('/')) {
      imageSrc = photo;
    } else {
      imageSrc = '/' + photo;
    }
  }
  
  const isOutOfStock = stock === 32 || stock === undefined;

  // Calculate discounted price if discount is present and is a number
  const hasDiscount = typeof discount === 'number' && discount > 0;
  const originalPrice = typeof price === 'number' ? price : parseFloat(price);
  const discountedPrice = hasDiscount
    ? Math.round(originalPrice * (1 - discount / 100))
    : originalPrice;

  return (
    <div
      className={`w-full h-full flex relative justify-center items-center border border-[#FB9E3A] rounded-md shadow-[0px_5px_15px_0px_#0000000D] cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-200 ease-in-out
        ${isOutOfStock ? 'pointer-events-none opacity-50 cursor-not-allowed bg-gray-300' : ''}`}
      onClick={isOutOfStock ? undefined : ordersClick}
    >
      {/* Discount Banner */}
      {hasDiscount && (
        <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
          -{discount}% OFF
        </div>
      )}
      <div className="w-[110px]">
        <div className="space-y-[15px]">
          <div className="w-[110px] h-[110px] relative overflow-hidden flex items-center justify-center">
            <Image
              src= {imageSrc}
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
            <div className="flex flex-col items-center">
              <span className={`text-xs md:text-sm lg:text-[16px] leading-[24px] font-extrabold text-center text-[#000000] ${hasDiscount ? 'line-through text-gray-400' : ''}`}>
                {originalPrice} MMK
              </span>
              {hasDiscount && (
                <span className="text-xs md:text-sm lg:text-[16px] leading-[24px] font-extrabold text-center">
                  {discountedPrice} MMK
                </span>
              )}
            </div>
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
      {isOutOfStock && (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <span
            className="absolute left-0 bottom-0 right-0 top-0 flex items-center justify-center"
            style={{
              transform: 'rotate(-20deg)',
              width: '100%',
              height: '100%',
            }}
          >
            <span className="block w-full text-center text-red-600 border border-red-600 rounded-lg text-2xl font-extrabold my-2 mx-3">
              Out of Stock
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
