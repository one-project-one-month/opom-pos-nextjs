'use client'
import Loading from '@/app/(root)/staff/loading';
import CustomBtn from '@/app/components/custom-btn';
import { FilterSvg, LowStocksSvg, OutOfStocksSvg, TotalProductsSvg } from '@/app/components/custom-svg';
import CustomTable from '@/app/components/custom-table';
import ManagerCategoryList from '@/app/components/manager-category-list';
import Modal from '@/app/components/modal';
import ModalTitle from '@/app/components/modal-title';
import ProductForm from '@/app/components/products/product-form';
import TableTitle from '@/app/components/table-title';
import { useFetchCategories } from '@/app/hooks/useFetchCategory';
import { useCreateProduct, useDeletProduct, useFetchManagerProducts } from '@/app/hooks/useFetchProduct';
import { ProductFormValues } from '@/app/type/form';
import { CategoriesResponse, Product, ProductsResponse } from '@/app/type/product';
import { LoaderIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

function InventoryPage() {
  const [detailData, setDetailData] = useState<Product>();
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [isProductAdd, setIsProductAdd] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [productId, setProductId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const params = {
    ...(page !== 0 && { page }),
    ...(size !== 0 && { pageSize: size }),
    ...(status && { status }),
    ...(categoryName && { category_name: categoryName }),
  };

  const { error, isLoading, data } =
    useFetchManagerProducts<ProductsResponse>(params);
  const {
    error: categoriesError,
    isLoading: categoriesLoading,
    data: categories,
  } = useFetchCategories<CategoriesResponse[]>();
  const {
    mutate,
    isPending,
    error: mutateError,
    data: responseData,
  } = useCreateProduct(() => {
    setShowModal(false);
    toast.success(`Successfully ${detailData ? "Updated" : "Created"}`);
  });
  const {
    mutate: deleteMutate,
    isPending: isDeletePending,
    error: deleteError,
  } = useDeletProduct(() => {
    setConfirmModal(false);
    toast.success("Successfully Deleted");
  });

  const products = data?.products?.data ?? [];
  const total = data?.["count of total products"] ?? 0;
  const outOfStock = data?.["count of out of stock"] ?? 0;
  const lowStock = data?.["count of low of stock"] ?? 0;

  const productsList = [
    {
      title: "Total Products",
      svg: <TotalProductsSvg width={24} height={24} />,
      count: total,
      color: "bg-success-300",
    },
    {
      title: "Low Stock Item",
      svg: <LowStocksSvg width={25} height={25} />,
      count: lowStock,
      color: "bg-primary-400",
    },
    {
      title: "Out of Stocks",
      svg: <OutOfStocksSvg width={25} height={25} />,
      count: outOfStock,
      color: "bg-alert-300",
    },
  ];

  const labelItems = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Out of Stock",
      value: "out_of_stock",
    },
    {
      label: "Low Stock",
      value: "low_stock",
    },
    {
      label: "In Stock",
      value: "full_stock",
    },
  ];

  const columns = [
    {
      title: "No",
      key: "id",
      dataIndex: "id",
      render: (value: string, record: Product, index: number) => (
        <span>{(page - 1) * size + index + 1}</span>
      ),
    },
    {
      title: "SKU",
      key: "sku",
      dataIndex: "sku",
    },
    {
      title: "Product name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "stock",
      render: (value: string) => (
        <div>
          {Number(value) > 50 ? (
            <span className="bg-green-600 rounded-3xl px-2 py-1 text-sm text-white">
              Full Stock
            </span>
          ) : Number(value) >= 1 ? (
            <span className="bg-yellow-600 rounded-3xl px-2 py-1 text-sm text-white">
              Low Stock
            </span>
          ) : (
            <span className="bg-red-600 rounded-3xl px-2 py-1 text-sm text-white">
              Out of Stock
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (value: string, record: Product) => (
        <div className="flex gap-2 font-bold">
          <button
            className="text-blue-500 cursor-pointer"
            onClick={() => handleEdit(record)}
          >
            Edit
          </button>{" "}
          {" / "}
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setProductId(record.id);
              setConfirmModal(true);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setShowModal(true);
    setIsProductAdd(true);
  };

  const handleEdit = (data: Product) => {
    setDetailData(data);
    setShowModal(true);
    setIsProductAdd(false);
  };

  const handleDelete = () => {
    deleteMutate(productId);
  };

  const handleAction = (data: ProductFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (!detailData?.sku) formData.append("sku", String(data?.sku));
    formData.append("price", String(data.price));
    formData.append("const_price", String(data.constPrice));
    formData.append("stock", String(data.stock));
    formData.append("brand_id", String(data.brandId));
    formData.append("category_id", String(data.categoryId));
    formData.append("dis_percent", String(10));
    if (data.photo instanceof FileList) {
      formData.append("photo", data.photo?.[0]);
    } else if (typeof data.photo === "string") {
      formData.append("photo", data.photo);
    }
    if (data.expiredDate)
      formData.append("expired_at", String(data.expiredDate));
    mutate({
      formData,
      id: detailData ? data?.id : undefined,
    });
  };

  const handleLabelClick = (value: string) => {
    setShowMenu(false);
    setStatus(value);
  };

  const handleCategoryClick = (name: string) => {
    setCategoryName(name);
  };

  return (
    <>
      <p className="text-xl">Inventory Management</p>
      <div className="flex gap-8">
        {
          productsList.map((product, index) => (
            <div
              key={index}
              className="w-[220] p-5 shadow-md flex justify-center items-center gap-5 my-7"
            >
              <div
                className={`${product.color} w-[45] h-[45] rounded-sm flex justify-center items-center`}
              >
                {product.svg}
              </div>
              <div>
                <p className='mb-1'>{product.title}</p>
                <p className='font-semibold text-lg'>{isLoading ? <LoaderIcon /> : product.count}</p>
              </div>
            </div>
          ))
        }
      </div>
      {
        categoriesLoading && <Loading />
      }
      {categoriesError && <p className='text-alert-400 mb-6'>Error loading categories</p>}
      {
        !categoriesLoading && !categoriesError &&
        <div className='grid md:grid-cols-5 sm:grid-cols-3 gap-2'>
          {
            categories?.map((item, index) => {
              if (!item.product.length) return null
              return (
                <div key={index} className='border border-primary-400 rounded-md p-5'>
                  <div className='mb-3'>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.product.length}</p>
                </div>
              )
            })
          }
        </div>
      }
      <div className='flex justify-between mt-10 mb-5'>
        <TableTitle>Product Lists</TableTitle>
        <div className="flex gap-5 relative">
          <CustomBtn
            className="bg-[#FB9E3A] hover:bg-[#E28E34] flex gap-2"
            onClick={() => handleAdd()}
          >
            <Plus /> Add product
          </CustomBtn>
          <CustomBtn
            className="border border-primary-300 text-black flex gap-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FilterSvg width={18} height={18} /> Filters
          </CustomBtn>
          {showMenu && (
            <div className="absolute right-0 top-[42px] min-h-[130px] w-[150px] bg-white rounded-md p-3 border border-gray-300 flex flex-col justify-between">
              {labelItems?.map((stock, index) => (
                <span
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                  onClick={() => handleLabelClick(stock.value)}
                >
                  {stock.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {categories && (
        <ManagerCategoryList
          categoryData={categories}
          handleCategoryClick={handleCategoryClick}
        />
      )}
      <br />
      <div>
        {isLoading && (
          <div className="text-center">
            <Loading />
          </div>
        )}
        {error && <p className="text-alert-400">Error loading products</p>}

        {!isLoading && !error && (
          <CustomTable
            columns={columns}
            data={products}
            pagination={{
              pageSize: size,
              currentPage: data?.products?.current_page,
              lastPage: data?.products?.last_page,
              total: data?.products?.total,
              handleOnChange: (newPage, newSize) => {
                setPage(newPage);
                setSize(newSize);
              },
            }}
          />
        )}
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
        >
          <ModalTitle>Product Information</ModalTitle>
          <ProductForm
            detailData={isProductAdd ? null : detailData}
            handleAction={(data) => handleAction(data)}
            loading={isPending}
          />
        </Modal>
      )}
      {confirmModal && (
        <Modal
          onClose={() => setConfirmModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
        >
          <ModalTitle>Confirmation</ModalTitle>
          <span className="text-center">
            Are you sure to delete this product?
          </span>
          <div className="flex justify-center gap-2 mt-5">
            <CustomBtn
              className="border border-alert-400 hover:bg-alert-500 hover:text-white text-black"
              onClick={() => setConfirmModal(false)}
            >
              No
            </CustomBtn>
            <CustomBtn
              className="border border-success-400 hover:bg-success-500 hover:text-white text-black flex gap-2 justify-center items-center"
              onClick={() => handleDelete()}
            >
              {isDeletePending && <LoaderIcon />}
              Yes
            </CustomBtn>
          </div>
        </Modal>
      )}
      {errorModal && (
        <Modal
          onClose={() => setErrorModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
        >
          <ModalTitle>Error</ModalTitle>
          <span className="text-center">
            {deleteError ? "Something Went Wrong" : ""}
          </span>
          <div className="flex justify-center gap-2 mt-5">
            <CustomBtn
              className="border border-alert-400 hover:bg-alert-500 hover:text-white text-black"
              onClick={() => setErrorModal(false)}
            >
              Ok
            </CustomBtn>
          </div>
        </Modal>
      )}
    </>
  );
}

export default InventoryPage;
