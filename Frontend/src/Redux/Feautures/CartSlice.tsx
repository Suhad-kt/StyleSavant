import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItems {
  _id: string;
  name: string;
  price: number;
  photo: string;
  description: string;
}

interface CartState {
  CartItems: CartItems[];
  cartTotalQuantity: number;
}

const cartItemsFromLocalstorage = localStorage.getItem("cartItems")
const parsedCartItems =cartItemsFromLocalstorage ?  JSON.parse(cartItemsFromLocalstorage) as CartItems[] :[]

const initialState: CartState = {
  CartItems:  parsedCartItems,
  cartTotalQuantity: 0,
};


const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItems>) {
      const id = action.payload._id;
      const existingItem = state.CartItems.find((item) => item._id === id);

      if (!existingItem) {
        state.CartItems.push(action.payload)
      }
      localStorage.setItem("cartItems", JSON.stringify(state.CartItems));
    },
    RemoveFromCart(state, action: PayloadAction<string>) {
      state.CartItems = state.CartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.CartItems));
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, RemoveFromCart } = CartSlice.actions;
