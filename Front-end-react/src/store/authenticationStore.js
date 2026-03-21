  import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
  import {auth} from '../store/firebase'
  import {signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'

  /*
  export const loginUser=createAsyncThunk('loginUser',
    async({email,password})=>{
      const res=await fetch('http://localhost:3001/user/login-user',{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify({email,password})
      })
      const data=await res.json()
      return data
  })*/

  const url= process.env.NODE_ENV==='production' ? "" : 'http://localhost:3001'

  export const loginUser=createAsyncThunk('loginUser',
    async({email,password})=>{
    try {
        const userCredentials=await signInWithEmailAndPassword(auth,email,password)
        const idToken=await userCredentials.user.getIdToken()
        const res=await fetch(`${url}/user/login-user`,{
          method:"POST",
          credentials:'include',
          headers:{
            "content-type":"application/json",
          },
          body:JSON.stringify({idToken})
        })
        const data=await res.json()
        console.log('data ',data)
        return data
    } catch (error) {
      console.log('error from store',error.message)
      return {success:false,message:error.message}
    }
    }
  )

  export const signupUser=createAsyncThunk('signUpUser',
    async({email_,userName,password})=>{
      try{
        const userCredential=await createUserWithEmailAndPassword(auth,email_,password)
        const user= userCredential.user
        const uid=user.uid
        const idToken=await user.getIdToken()
        const email=user.email
        const res=await fetch(`${url}/user/signup-user`,{
          method:"POST",
          credentials:'include',
          headers:{"content-type":"application/json"},
          body:JSON.stringify({uid,email,userName,idToken})
        })
        const data=await res.json()
        return data
      }catch(e){
        console.log(e)
        return {success:false,message:e.message}
      }
  }
  )

  export const logoutUser=createAsyncThunk('logoutUser',
    async()=>{
      const res=await fetch(`${url}/user/logout`,{
        method:"GET",
        credentials:'include'
      })
      const data=await res.json()
      return data
    }
  )

  export const handleGoogleSignup=createAsyncThunk('googleSingnup',
    async()=>{
      const googleLoginProvider=new GoogleAuthProvider()
      try{
        const result=await signInWithPopup(auth,googleLoginProvider)
        const user=result.user
        const idToken=await user.getIdToken()
        const email=user.email
        const userName=user.displayName
        const uid=user.uid
        const res=await fetch(`${url}/user/signup-user`,{
          method:"POST",
          credentials:'include',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({email,userName,uid,idToken})
        })
        const data=await res.json()
        return data
      }catch(e){
        return {success:false,message:e.message}
      }
    }
  )

  export const handleGoogleLogin=createAsyncThunk('googleLogin',
    async()=>{
      const googleProvider=new GoogleAuthProvider()
      try{
        const userCredential=await signInWithPopup(auth,googleProvider)
        const user=userCredential.user
        const idToken=await user.getIdToken()
        const res=await fetch(`${url}/user/login-user`,{
          method:"POST",
          credentials:'include',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({idToken})
        })
        const data=res.json()
        return data
        
      }catch(e){
        return {success:false,message:e.message}
      }
    }
  )

  export const getUserData=createAsyncThunk('getUserData',
    async()=>{
      try{
        console.log('in get user Data')
      const res=await fetch(`${url}/user/get-token`,{
        method:"GET",
        credentials:'include',
      })
      const data=await res.json()
      console.log(data)
      return data
    }catch(e){
      return {success:false,message:e.message}
    }
    })



  const authenticationSlice=createSlice({
    name:'authenticationSlice',
    reducers:{},
    initialState:{
      user:{}
    },
    extraReducers:(builder)=>{
      builder.addCase(loginUser.fulfilled,(state,action)=>{
        //console.log(action.payload)
      })
      builder.addCase(getUserData.fulfilled,(state,action)=>{
        state.user=action.payload.user
      })
    }
  })

  export default authenticationSlice