'use client'
import React, { useState, useMemo } from 'react'
import { ChevronDown, Download, Filter, Edit, Trash2, Calendar, DollarSign, X } from 'lucide-react'

function SaleReportsPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterMonth, setFilterMonth] = useState('This month')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [filters, setFilters] = useState({
    staffName: '',
    paymentMethod: '',
    dateRange: '',
    minAmount: '',
    maxAmount: ''
  })

  // Sample data
  const salesData = [
    {
      id: '1231231414214',
      itemsCount: 23,
      staffName: 'Jay So',
      totalAmount: '30000 MMK',
      paymentMethod: 'Cash Payment',
      time: '02:33:44',
      date: '2025-07-19'
    },
    {
      id: '1544535354535',
      itemsCount: 23,
      staffName: 'Jane Doe',
      totalAmount: '45000 MMK',
      paymentMethod: 'KBZ Banking',
      time: '03:15:22',
      date: '2025-07-18'
    },
    {
      id: '8679879797978',
      itemsCount: 15,
      staffName: 'John Smith',
      totalAmount: '25000 MMK',
      paymentMethod: 'Visa Card',
      time: '01:45:10',
      date: '2025-07-17'
    },
    {
      id: '9876543210123',
      itemsCount: 30,
      staffName: 'Jay So',
      totalAmount: '50000 MMK',
      paymentMethod: 'Cash Payment',
      time: '04:20:15',
      date: '2025-07-16'
    },
    {
      id: '5432109876543',
      itemsCount: 18,
      staffName: 'Alice Johnson',
      totalAmount: '35000 MMK',
      paymentMethod: 'Wave Pay',
      time: '02:55:30',
      date: '2025-07-15'
    }
  ]

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return salesData.filter(sale => {
      const matchesStaff = !filters.staffName || 
        sale.staffName.toLowerCase().includes(filters.staffName.toLowerCase())
      
      const matchesPayment = !filters.paymentMethod || 
        sale.paymentMethod === filters.paymentMethod
      
      const amount = parseInt(sale.totalAmount.replace(/[^\d]/g, ''))
      const matchesMinAmount = !filters.minAmount || 
        amount >= parseInt(filters.minAmount)
      const matchesMaxAmount = !filters.maxAmount || 
        amount <= parseInt(filters.maxAmount)
      
      return matchesStaff && matchesPayment && matchesMinAmount && matchesMaxAmount
    })
  }, [salesData, filters])

  // Get unique values for filter dropdowns
  const uniqueStaff = [...new Set(salesData.map(sale => sale.staffName))]
  const uniquePaymentMethods = [...new Set(salesData.map(sale => sale.paymentMethod))]

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredData.length 
        ? [] 
        : filteredData.map(item => item.id)
    )
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      staffName: '',
      paymentMethod: '',
      dateRange: '',
      minAmount: '',
      maxAmount: ''
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sale Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Today Sales Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-600 font-medium">Today Sales</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">12000 MMK</div>
            <p className="text-sm text-gray-500">vs yesterday</p>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-600 font-medium">Total Revenue</h2>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">12000 MMK</div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">This Month</span>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">+20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sale Report Section */}
      <div className="bg-white rounded-lg shadow-sm ">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Sale Report</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                <Download className="w-4 h-4" />
                Export to pdf
              </button>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 border px-4 py-2 rounded-lg transition-colors ${
                  showFilters || hasActiveFilters 
                    ? 'border-orange-500 bg-orange-50 text-orange-600' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(filters).filter(v => v !== '').length}
                  </span>
                )}
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

          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales Report</h3>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Staff Name Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Staff Name
                </label>
                <select
                  value={filters.staffName}
                  onChange={(e) => handleFilterChange('staffName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Staff</option>
                  {uniqueStaff.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>

              {/* Payment Method Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={filters.paymentMethod}
                  onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Methods</option>
                  {uniquePaymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {/* Amount Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Range (MMK)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {filteredData.length} of {salesData.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receipt id number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(sale.id)}
                      onChange={() => handleSelectItem(sale.id)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.itemsCount} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.staffName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sale.time}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">
                1-{Math.min(itemsPerPage, filteredData.length)} of {filteredData.length} item{filteredData.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-sm text-gray-700">of 40 pages</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  <ChevronDown className="w-4 h-4 rotate-90" />
                </button>
                <button 
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="p-1 rounded hover:bg-gray-200"
                >
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleReportsPage