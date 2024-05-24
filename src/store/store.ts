import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wpAPI } from "@/store/wordpress/wpAPI";
import { wooCommerceApi } from "@/store/wooCommerce/wooCommerceApi";
import MenuCategoriesSlice from "./reducers/MenuCategoriesSlice";
import { contactForm7Api } from "./contactForm7/contactForm7Api";
import CartSlice from "./reducers/CartSlice";
import PopupSlice from "./reducers/PopupSlice";
import { cartLocalStorageMiddleware } from "./reducers/CartSlice";

const rootReducer = combineReducers({
    [wpAPI.reducerPath]: wpAPI.reducer,
    [contactForm7Api.reducerPath]: contactForm7Api.reducer,
    [wooCommerceApi.reducerPath]: wooCommerceApi.reducer,
    MenuCategoriesSlice: MenuCategoriesSlice.reducer,
    Cart: CartSlice,
    Popup: PopupSlice
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpAPI.middleware)
                .concat(contactForm7Api.middleware)
                .concat(wooCommerceApi.middleware)
                .concat(cartLocalStorageMiddleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
