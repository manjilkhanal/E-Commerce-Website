import { configureStore } from "@reduxjs/toolkit";
import  useReducer,{ setUser, clearUser} from "./user.slice";

export const store = configureStore({
    reducer: {
        user: useReducer
    }
})

export {setUser, clearUser}