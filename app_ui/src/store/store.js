import { configureStore } from '@reduxjs/toolkit'
import selectedDoc from './slices/selectedDoc'
export default configureStore({
  reducer: {
    selectedDoc,
  },
})