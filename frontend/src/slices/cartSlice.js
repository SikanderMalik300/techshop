import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartutils';

// Initial state from localStorage or default
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [],
    itemsPrice: '0.00',
    shippingPrice: '0.00',
    taxPrice: '0.00',
    totalPrice: '0.00'
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // Ensure prices are numbers and update cart
            state.cartItems.forEach(cartItem => {
                cartItem.price = Number(cartItem.price);
                cartItem.qty = Number(cartItem.qty);
            });

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        updateCartItemQty: (state, action) => {
            const { id, qty } = action.payload;
            const item = state.cartItems.find((x) => x._id === id);

            if (item) {
                item.qty = qty;
                return updateCart(state);
            }
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQty } = cartSlice.actions;

export default cartSlice.reducer;