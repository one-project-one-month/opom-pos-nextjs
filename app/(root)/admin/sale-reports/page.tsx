'use client'
import { RevenueSvg } from '@/app/components/custom-svg'
import TableTitle from '@/app/components/table-title'
import NoData from '@/public/assets/no-data.png'
import { ChevronDown, Download, SquareChartGantt } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { SaleReport, saleReportService, TopSaleItem, TotalAmount, TotalGainByMonthly, WeeklyGain } from '../../../services/saleReportService'
import Loading from '../../staff/loading'

function SaleReportsPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterMonth, setFilterMonth] = useState('This month')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [salesData, setSalesData] = useState<SaleReport[]>([])
  const [topSaleData, setTopSaleData] = useState<TopSaleItem[]>([])
  const [totalSales, setTotalSales] = useState(0)
  const [lastPage, setLastPage] = useState(1)
  const [weeklyGain, setWeeklyGain] = useState<WeeklyGain | null>(null)
  const [totalAmount, setTotalAmount] = useState<TotalAmount | null>(null)
  const [totalGainByMonthly, setTotalGainByMonthly] = useState<TotalGainByMonthly | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [viewMode, setViewMode] = useState<'recent' | 'topSale'>('recent')

  // Filter states
  const [filters, setFilters] = useState({
    staffName: '',
    paymentMethod: '',
    dateRange: '',
    minAmount: '',
    maxAmount: ''
  })

  // Filter data based on current filters and view mode
  const filteredData = useMemo(() => {
    if (viewMode === 'topSale') {
      return topSaleData.filter(item => {
        const matchesStaff = !filters.staffName ||
          (item.product?.name && item.product.name.toLowerCase().includes(filters.staffName.toLowerCase()))

        const amount = item.product?.price || 0
        const matchesMinAmount = !filters.minAmount ||
          amount >= parseInt(filters.minAmount)
        const matchesMaxAmount = !filters.maxAmount ||
          amount <= parseInt(filters.maxAmount)

        return matchesStaff && matchesMinAmount && matchesMaxAmount
      })
    }

    return salesData.filter(sale => {
      const matchesStaff = !filters.staffName ||
        (sale.user?.name && sale.user.name.toLowerCase().includes(filters.staffName.toLowerCase()))

      const matchesPayment = !filters.paymentMethod ||
        filters.paymentMethod === 'all'

      const amount = sale.total || 0
      const matchesMinAmount = !filters.minAmount ||
        amount >= parseInt(filters.minAmount)
      const matchesMaxAmount = !filters.maxAmount ||
        amount <= parseInt(filters.maxAmount)

      return matchesStaff && matchesPayment && matchesMinAmount && matchesMaxAmount
    })
  }, [salesData, topSaleData, filters, viewMode])

  // Get unique values for filter dropdowns
  const uniqueStaff = viewMode === 'topSale'
    ? [...new Set(topSaleData.filter(item => item.product?.name).map(item => item.product!.name))]
    : [...new Set(salesData.filter(sale => sale.user?.name).map(sale => sale.user.name))]
  const uniquePaymentMethods = ['Cash Payment', 'KBZ Banking', 'Visa Card', 'Wave Pay']

  // Fetch data from API
  const fetchSalesData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch orders based on filter
      let ordersResponse
      if (filterMonth === 'This month') {
        ordersResponse = await saleReportService.getMonthlyOrders(currentPage)
      } else {
        ordersResponse = await saleReportService.getOrders(currentPage)
      }

      // Check if response exists
      if (!ordersResponse) {
        throw new Error('Invalid response structure from API')
      }

      setSalesData(ordersResponse.data || [])
      setTotalSales(ordersResponse.total || 0)
      setLastPage(ordersResponse.last_page || 1)

      // Fetch monthly top sale data
      try {
        const topSaleResponse = await saleReportService.getMonthlyTopSale(currentPage)
        setTopSaleData(topSaleResponse.data || [])
      } catch (topSaleError) {
        console.error('Error fetching top sale data:', topSaleError)
        setTopSaleData([])
      }

      // Fetch weekly gain for stats
      try {
        const weeklyGainData = await saleReportService.getWeeklyGain()
        setWeeklyGain(weeklyGainData)
      } catch (gainError) {
        console.error('Error fetching weekly gain:', gainError)
        setWeeklyGain({ total_cost: 0, total_price: 0, gain: 0 })
      }

      // Fetch total amount for stats
      try {
        const totalAmountData = await saleReportService.getTotalAmount()
        setTotalAmount(totalAmountData)
      } catch (amountError) {
        console.error('Error fetching total amount:', amountError)
        setTotalAmount({ total_amount: 0 })
      }
      // Fetch total gain amount by monthly
      try {
        const totalGain = await saleReportService.getGainByMonthly()
        setTotalGainByMonthly(totalGain)
      } catch (amountError) {
        console.error('Error fetching total amount:', amountError)
        setTotalGainByMonthly({ total_gain: 0 })
      }
    } catch (error) {
      console.error('Error fetching sales data:', error)
      setError('Failed to load sales data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSalesData()
  }, [currentPage, filterMonth])

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '0 MMK'
    }
    return `${amount.toLocaleString()} MMK`
  }

  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) {
      return '-'
    }
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return '-'
      }
      return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    } catch (error) {
      return '-'
    }
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return '-'
    }
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return '-'
      }
      return date.toLocaleDateString('en-CA') // YYYY-MM-DD format
    } catch (error) {
      return '-'
    }
  }

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (viewMode === 'topSale') {
      setSelectedItems(
        selectedItems.length === filteredData.length
          ? []
          : (filteredData as TopSaleItem[]).map(item => item.product_id.toString())
      )
    } else {
      setSelectedItems(
        selectedItems.length === filteredData.length
          ? []
          : (filteredData as SaleReport[]).map(item => item.id.toString())
      )
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Handle view mode toggle
  const handleToggleView = () => {
    setViewMode(prev => prev === 'recent' ? 'topSale' : 'recent')
  }

  // Handle PDF download
  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      const pdfBlob = await saleReportService.downloadSaleReportsPDF()

      // Create a download link
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      link.download = `sale-reports-${currentDate}.pdf`

      // Trigger download
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error('Error downloading PDF:', error)
      setError('Failed to download PDF report. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  // const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <TableTitle>Sale Overview</TableTitle>
        {/* Stats Cards */}
        <div className="flex flex-col md:flex-row lg:gap-12 gap-3 my-7">
          {/* Today Sales Card */}
          <div className="w-full sm:w-[300px] h-[150px] flex flex-col justify-between hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-10% border-2 p-3 rounded border-[#E28E34]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-600 font-medium">Today Sales</h2>
              <SquareChartGantt />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {weeklyGain ? formatCurrency(weeklyGain.gain) : <Loading />}
            </div>
            <p className="text-sm text-gray-500">vs yesterday</p>
          </div>

          {/* Total Revenue Card */}
          <div className="w-full sm:w-[300px] h-[150px] flex flex-col justify-between hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-10% border-2 p-3 rounded border-[#E28E34]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-600 font-medium">Total Revenue</h2>
              <RevenueSvg />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalAmount ? formatCurrency(totalAmount.total_amount) : <Loading />}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 mr-2">This Month</span>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Sale Report Section */}
      <div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sale Report</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={(filteredData.length === 0) || isDownloading}
                className="flex items-center gap-2 bg-primary-300 text-white px-4 py-2 rounded-lg hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className={`w-4 h-4 ${isDownloading ? 'animate-spin' : ''}`} />
                {isDownloading ? 'Downloading...' : 'Export to PDF'}
              </button>

              <div className="relative">
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option>This month</option>
                  <option>Last month</option>
                  <option>This year</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          <h3
            className="text-lg text-gray-900 mb-4 cursor-pointer hover:text-orange-600 transition-colors"
            onClick={handleToggleView}
          >
            {viewMode === 'recent' ? 'Recent Sales Report' : 'Monthly Top Sale Items'}
            <span className="text-sm text-gray-500 ml-2">(Click to toggle)</span>
          </h3>

        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right bg-gray-50">
              <tr>
                {/* <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                </th> */}
                {viewMode === 'recent' ? (
                  <>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      No
                    </th>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      Receipt ID
                    </th>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      Items Count
                    </th>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      Staff name
                    </th>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      Payment method
                    </th>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      Time
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 font-bold text-gray-900">
                      No
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">
                      Quantity Sold
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">
                      Total Sales
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-gray-900">
                      Category
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={7} className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        {/* <div className="w-4 h-4 bg-gray-200 round/ed animate-pulse"></div> */}
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-gray-500 h-60">
                    <div className="flex flex-col items-center justify-center h-full">
                      <Image src={NoData} width={60} height={60} alt="no data img" />
                      <span className="font-semibold text-md mt-2">No Data Found</span>
                    </div>
                  </td>
                </tr>

              ) : viewMode === 'recent' ? (
                // Recent Sales Table
                (filteredData as SaleReport[]).map((sale, index) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(sale.id.toString())}
                        onChange={() => handleSelectItem(sale.id.toString())}
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                      />
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sale.order_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      - items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.user?.name || 'Unknown Staff'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(sale.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Cash Payment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(sale.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                // Top Sale Items Table
                (filteredData as TopSaleItem[]).map((item, index) => (
                  <tr key={item.product_id} className="hover:bg-gray-50">
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.product_id.toString())}
                        onChange={() => handleSelectItem(item.product_id.toString())}
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                      />
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.product?.name || 'Unknown Product'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.product?.sku || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.total_quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(parseInt(item.total))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Category {item.product?.category_id || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {
          filteredData?.length > 0 &&
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700">
                  1-{Math.min(itemsPerPage, filteredData.length)} of {totalSales} item{totalSales !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {Array.from({ length: lastPage }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <span className="text-sm text-gray-700">of {lastPage} pages</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(lastPage, currentPage + 1))}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                    disabled={currentPage === lastPage}
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default SaleReportsPage