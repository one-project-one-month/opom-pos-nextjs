import { useForm } from 'react-hook-form'
import CustomBtn from '../custom-btn';
import { useFetchCategories } from '@/app/hooks/useFetchCategory';
import { Brand, Category } from '@/app/type/type';
import { useFetchBrands } from '@/app/hooks/useFetchBrands';
import { useState } from 'react';
import { Product } from '@/app/type/product';
import { ProductFormValues } from '@/app/type/form';
import { Loader, LoaderIcon, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

type ProductFormProps = {
    detailData?: Product | null;
    handleAction: (data: ProductFormValues) => void;
    loading: boolean
};

const ProductForm = ({ detailData, handleAction, loading }: ProductFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
        defaultValues: {
            sku: detailData?.sku,
            name: detailData?.name,
            categoryId: detailData?.category_id,
            price: detailData?.price,
            constPrice: detailData?.const_price,
            brandId: detailData?.brand_id,
            stock: detailData?.stock,
            photo: detailData?.photo,
            expiredDate: detailData?.expired_at
        }
    })
    const { error: categoriesError, isLoading: categoriesLoading, data: categories } = useFetchCategories<Category[]>();
    const { error: brandsError, isLoading: brandsLoading, data: brands } = useFetchBrands<Brand[]>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const inputStyle = 'bg-input-gray w-full px-3 h-10 rounded-md mt-2 text-sm text-gray-600'

    const onSubmit = (data: ProductFormValues) => {
        handleAction({ ...data, id: detailData?.id })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        } else {
            setPreviewUrl(null)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-3'>
            <div>
                <label>SKU</label>
                <input
                    type='number'
                    disabled={detailData?.sku ? true : false}
                    readOnly={detailData?.sku ? true : false}
                    {...register("sku", { required: "SKU is required" })}
                    className={`w-full px-3 h-10 rounded-md mt-2 text-sm ${detailData?.sku ? 'bg-gray-200 text-gray-400' : 'bg-input-gray text-gray-600'}`} />
                {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
            </div>
            <div>
                <label>Product Name</label>
                <input
                    {...register("name", { required: "Product Name is required" })}
                    className={inputStyle} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
                <label>Price</label>
                <input
                    type='number'
                    {...register("price", { required: "Price is required" })}
                    className={inputStyle} />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
                <label>Cost Price</label>
                <input
                    type='number'
                    {...register("constPrice", { required: "Cost price is required" })}
                    className={inputStyle} />
                {errors.constPrice && <p className="text-red-500 text-sm">{errors.constPrice.message}</p>}
            </div>
            <div>
                <label>Stock</label>
                <input
                    type='number'
                    {...register("stock", { required: "Stock is required" })}
                    className={inputStyle} />
                {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
            </div>
            <div>
                <label>Brand</label>
                {
                    brandsLoading ? <Loader /> :
                        <select
                            {...register("brandId", { required: "Brand Name is required" })}
                            className={inputStyle}>
                            <option value="">Select Brand</option>
                            {
                                brands?.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))
                            }
                        </select>
                }
                {errors.brandId && <p className="text-red-500 text-sm">{errors.brandId.message}</p>}
            </div>
            <div className='col-span-2'>
                <label>Category</label>
                {
                    categoriesLoading ? <Loader />
                        :
                        <select
                            {...register("categoryId", { required: "Category Name is required" })}
                            className={inputStyle}>
                            <option value="">Select Category</option>
                            {
                                categories?.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                }
                {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
            </div>
            <div className='col-span-2'>
                <label>Expired Date</label>
                <input type='date' min={new Date().toISOString().split("T")[0]}
                    {...register("expiredDate")}
                    className={inputStyle} />
            </div>
            <div>
                <label>Photo</label>
                <input type='file'
                    accept='image/*'
                    {...register("photo")}
                    className={inputStyle}
                    onChange={handleImageChange} />
            </div>
            {
                detailData?.photo &&
                <Image 
                src={`https://e0c8dfd98f99.ngrok-free.app/storage/${detailData?.photo}`}
                alt="name" width={100} height={100} />
            }
            {previewUrl && (
                <div className="mt-2 flex justify-center items-center border rounded-md">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        width={100}
                        height={100}
                    />
                </div>
            )}
            <CustomBtn type='submit' className='bg-primary-300 col-span-2 flex gap-2 justify-center items-center'>
                {
                    loading && <LoaderIcon />
                }
                {detailData ? 'Update' : 'Save'}
            </CustomBtn>
        </form>
    )
}

export default ProductForm