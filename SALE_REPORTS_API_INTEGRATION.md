# Sale Reports API Integration

This document describes the API integration implemented for the Sale Reports page in the OPOM POS React application.

## Overview

The Sale Reports page has been fully integrated with the backend APIs based on the Postman collection. The integration includes:

- Real-time sales data fetching
- Revenue statistics
- Pagination support
- Filtering capabilities
- Error handling and loading states

## APIs Integrated

### 1. Orders API
- **Endpoint**: `/orders`
- **Method**: GET
- **Parameters**: `page` (for pagination)
- **Purpose**: Fetch all orders with pagination

### 2. Monthly Orders API
- **Endpoint**: `/orders_month`
- **Method**: GET
- **Parameters**: `page` (for pagination)
- **Purpose**: Fetch monthly orders specifically

### 3. Weekly Revenue API
- **Endpoint**: `/week_gain`
- **Method**: GET
- **Purpose**: Get weekly revenue statistics (total cost, total price, gain)

### 4. Total Amount API
- **Endpoint**: `/total_amount`
- **Method**: GET
- **Purpose**: Get total revenue amount

### 5. Weekly Top Sale Items API
- **Endpoint**: `/get_weekly_top_sale_items`
- **Method**: GET
- **Parameters**: `page` (for pagination)
- **Purpose**: Get weekly top selling items

### 6. Monthly Top Sale Items API
- **Endpoint**: `/get_monthly_top_sale_items`
- **Method**: GET
- **Parameters**: `page` (for pagination)
- **Purpose**: Get monthly top selling items

## Files Modified/Created

### 1. Service Layer
- **File**: `app/services/saleReportService.ts`
- **Purpose**: Centralized API service for sale reports
- **Features**:
  - TypeScript interfaces for API responses
  - Error handling with fallback responses
  - Proper separation of concerns

### 2. Sale Reports Page
- **File**: `app/(root)/admin/(main)/sale-reports/page.tsx`
- **Features**:
  - Real-time data fetching from APIs
  - Loading states with skeleton UI
  - Error handling with user-friendly messages
  - Filtering by staff and amount ranges
  - Pagination support
  - Refresh functionality
  - Currency formatting
  - Date/time formatting

### 3. API Configuration
- **File**: `app/api-config.ts`
- **Updates**: Set proper base URL for ngrok tunnel

### 4. API Constants
- **File**: `app/constants/api.ts`
- **Updates**: Added sale report API endpoints

## Key Features Implemented

### Data Display
- **Sales Table**: Shows order number, staff name, total amount, payment method, and time
- **Statistics Cards**: Display today's sales and total revenue from APIs
- **Real-time Updates**: Data refreshes when filters change

### User Experience
- **Loading States**: Skeleton loading animation while fetching data
- **Error Handling**: User-friendly error messages with retry options
- **Refresh Button**: Manual refresh capability with loading indicator
- **Responsive Design**: Works on different screen sizes

### Filtering & Pagination
- **Time-based Filtering**: This month, all orders, last month, this year
- **Staff Filtering**: Filter by specific staff members
- **Amount Filtering**: Min/max amount range filtering
- **Pagination**: Navigate through multiple pages of results

### Data Formatting
- **Currency**: Formats amounts as "X,XXX MMK"
- **Time**: Displays time in HH:MM:SS format
- **Date**: Shows dates in YYYY-MM-DD format

## Error Handling

The implementation includes comprehensive error handling:

1. **Network Errors**: Graceful handling of API failures
2. **Fallback Data**: Returns empty/default data structures on errors
3. **User Feedback**: Clear error messages displayed to users
4. **Retry Mechanism**: Refresh button allows users to retry failed requests

## TypeScript Support

Full TypeScript support with:
- Strict type definitions for all API responses
- Interface definitions for sale reports, revenue data, and top sale items
- Type-safe API service methods
- Proper error handling with typed responses

## Usage

1. Navigate to the Sale Reports page in the admin panel
2. The page automatically loads recent sales data
3. Use the filter dropdown to switch between "This month" and "All orders"
4. Apply additional filters for staff and amount ranges
5. Use pagination controls to navigate through results
6. Click the refresh button to manually update data

## Configuration

Make sure the API base URL is correctly set in `app/api-config.ts`:
```typescript
Axios.defaults.baseURL = 'https://your-ngrok-url.ngrok-free.app/api/v1';
```

The ngrok header is automatically added to bypass browser warnings:
```typescript
config.headers.set("ngrok-skip-browser-warning", "69420");
```

## Testing

The integration has been tested with:
- Different filter combinations
- Pagination navigation
- Error scenarios (network failures)
- Loading states
- Data formatting

All major user flows work as expected with proper error handling and user feedback.
