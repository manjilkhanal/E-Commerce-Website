import { configureStore } from "@reduxjs/toolkit";
import  useReducer,{ setUser, clearUser} from "./user.slice";
import cartReducer, {setCart, clearCart, editCart, removeCart} from "./cart.slice"

export const store = configureStore({
    reducer: {
        user: useReducer,
        cart: cartReducer,
    }
})

export {setUser, clearUser, setCart, clearCart, editCart, removeCart}