import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    createItem(state, action) {
      // payload is the pizza object
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload is the pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      // payload is the pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseQuantity(state, action) {
      // payload is the pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  createItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = createSelector(
  (state) => state.cart.cart,
  (cart) => {
    const totalCartPrice = cart.reduce(
      (acc, cur) => acc + cur.unitPrice * cur.quantity,
      0,
    );
    const totalCartQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);

    return {
      totalCartPrice,
      totalCartQuantity,
    };
  },
);

export function getQuantityById(state, id) {
  // let result = (expressionResult !== null && expressionResult !== undefined) ? expressionResult : defaultValue;
  //  ??指仅当前面是undefined或null，则返回后面的值
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
}
