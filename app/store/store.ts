'use client'
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import orderSummarySlice from './slices/orderSummarySlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    orderSummary: orderSummarySlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
