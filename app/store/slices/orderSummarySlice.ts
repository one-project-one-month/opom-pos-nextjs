import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: string;
  photo: string;
  name: string;
  price: string;
  quantity: number;
}

export interface OrderSummaryState {
  orders: OrderItem[];
  paidAmount: number | '';
}

const initialState: OrderSummaryState = {
  orders: [],
  paidAmount: '',
};

export const orderSummarySlice = createSlice({
  name: 'orderSummary',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderItem>) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (state.orders.length !== 0 && order) {
        order.quantity++;
      } else {
        state.orders.unshift({ ...action.payload, quantity: 1 });
      }
    },

    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload.id);
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.quantity++;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.quantity--;
      }
    },

    setPaidAmount: (state, action: PayloadAction<number | ''>) => {
      state.paidAmount = action.payload;
    },

    clearPaidAmount: (state) => {
      state.paidAmount = '';
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const {
  addOrder,
  removeOrder,
  increaseQuantity,
  decreaseQuantity,
  setPaidAmount,
  clearPaidAmount,
  clearOrders,
} = orderSummarySlice.actions;

export default orderSummarySlice.reducer;
