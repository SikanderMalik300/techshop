// Helper function to add decimals
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

// Update cart function
export const updateCart = (state) => {
    // Calculate items price
    state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    // Calculate shipping price
    state.shippingPrice = state.itemsPrice > 1000 ? 0 : 15;
    // Calculate tax price
    state.taxPrice = state.itemsPrice * 0.15;
    // Calculate total price
    state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

    // Ensure prices are numbers and decimals are added
    state.itemsPrice = addDecimals(state.itemsPrice);
    state.shippingPrice = addDecimals(state.shippingPrice);
    state.taxPrice = addDecimals(state.taxPrice);
    state.totalPrice = addDecimals(state.totalPrice);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}