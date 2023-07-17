import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleSlice"
import scategoriesReducer from "../features/scategorieSlice"
import cartSliceReducer from "../features/cartSlice" 

const store = configureStore({
  reducer: {
    storearticles:articlesReducer,
    storescategories: scategoriesReducer,
    storecart:cartSliceReducer,
  }
})
export default store
