import styles from '../../styles/login.module.css'
import {TextField,Button} from '@mui/material'
import { LoginOutlined,Visibility,VisibilityOff} from '@mui/icons-material'
import {FcGoogle} from 'react-icons/fc'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserHook } from '../../hooks/userHook'



const Login = () => {



  const[loading,setLoading]=useState(false)
  const {login,googleLogin} =UserHook()

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    await login(e.target)  
    setLoading(false)
  }


  const [showPassword,setShowPassword]=useState(false)
  const handlePasswordVisibility=()=>{
    setShowPassword(!showPassword)
  }
  return (
    <div className={styles.main}>
      <ToastContainer position='top-center' autoClose={3000}/>
      <div className={styles.header}>
        <LoginOutlined/>
        <h1>LOGIN</h1>
        <span>please enter your details</span>
      </div>
      <div className={styles.containerForm}>
        <form onSubmit={handleOnSubmit}>
          <TextField size='small' fullWidth name='email' label='Email' placeholder='Your Registered Email' type='email' required/>
          <div className={styles.passwordContainer}>
          <TextField  size='small' fullWidth name='password' label='password' placeholder='Password' type={showPassword ? 'text' : 'password'} required/>
          <button type='button' onClick={handlePasswordVisibility}>{showPassword ? <Visibility /> :<VisibilityOff />}</button>
          </div>
          <Button variant='contained' fullWidth type='submit'>{loading ? 'Loading....' : 'Login'}</Button>
        </form>
      </div>
      <div className={styles.googleLogin}><Button fullWidth variant='outlined' startIcon={<FcGoogle />} 
      onClick={googleLogin}
      >Login with google</Button></div>
      <div className="signup">
        <Link to={'/signup'}>dont have an account click here to signup </Link>
      </div>
    </div>
  )
}

export default Login