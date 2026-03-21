import {configureStore} from '@reduxjs/toolkit'
import authtenticationSlice from './authenticationStore'




const store=configureStore({
  reducer:{
    authenticationStore:authtenticationSlice.reducer
  }
})

export default store