import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartutils';

// Initial state from localStorage or default
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {
    cartItems: [], shippingAddress : {} , paymentMethod : 'PayPal' 
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
                cartItem.quantity = Number(cartItem.quantity);
            });

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        updateCartItemQty: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((x) => x._id === id);

            if (item) {
                item.quantity = quantity;
                return updateCart(state);
            }
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state)
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            return updateCart(state);   
        }
    },
});

export const { addToCart, removeFromCart, updateCartItemQty, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;