import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserData,loginUser,logoutUser,handleGoogleLogin,signupUser,handleGoogleSignup } from "../store/authenticationStore";
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";


export const UserHook=()=>{

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [data,setData]=useState()
  

  useEffect(()=>{
    const setUser=async()=>{
      const res=await dispatch(getUserData())
      console.log('this is res ',res)
      setData(res.payload.user)
    }
    setUser()
  },[])

  const handleLogout=async()=>{
    const res=await dispatch(logoutUser())
    if(res.payload.success){
      navigate('/')
    }else{
      toast.error(res.payload.message)
    }
  }

  const handleLogin=async(formdata_)=>{
    const formData=new FormData(formdata_)
    const email=formData.get('email')
    const password=formData.get('password')
  
    const res=await dispatch(loginUser({email,password}))
    console.log(res)
    if(res.payload?.success){
      navigate('/home')
    }else{
      toast.error(res.payload.message)
    }

  }

  const handleSignup=async(formdata_)=>{
    const formData=new FormData(formdata_)
    const email_=formData.get('email')
    const userName=formData.get('userName')
    const password=formData.get('password')
    const res=await dispatch(signupUser({email_,userName,password}))
    if(res.payload.success){
      navigate('/home')
    }else{
      toast.error(res.payload.message)
    }
  }

  const googleLogin=async()=>{
    console.log('in google login')
    const res=await dispatch(handleGoogleLogin())
    if(res.payload.success){
      navigate('/home')
    }else{
        toast.error(res.payload.message)
    }
  }
const googleSignup=async()=>{
  const res=await dispatch(handleGoogleSignup())
  if(res.payload.success){
    navigate('/home')
  }else{
    toast.error(res.payload.message)
  }
  }
  
  return {
    data,
    logout: handleLogout,
    login: handleLogin,
    googleLogin,
    signup: handleSignup,
    googleSignup
  };

}