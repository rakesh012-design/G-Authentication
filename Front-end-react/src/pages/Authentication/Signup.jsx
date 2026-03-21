import {TextField,Button} from '@mui/material'
import {PersonAdd,Visibility,VisibilityOff,Google} from '@mui/icons-material'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import styles from '../../styles/login.module.css'
import { useDispatch } from 'react-redux'
import { signupUser, handleGoogleSignup } from '../../store/authenticationStore'
import { ToastContainer,toast } from 'react-toastify'
import { UserHook } from '../../hooks/userHook'

const Signup = () => {



  const [showPassword,setShowPassword]=useState(false)
  const [loading,setLoading]=useState(false)

  const {signup,googleSignup} =UserHook()

   const handlePasswordVisibility=()=>{
    setShowPassword(!showPassword)
  }

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    await signup(e.target)
    setLoading(false)
  }

  

  return (
    <div>
      <ToastContainer autoClose={3000} position='top-center'/>
      <div className={styles.main}>
      <div className={styles.header}>
        <PersonAdd/>
        <h1>SignUp</h1>
        <span>please enter your details</span>
      </div>
      <div className={styles.containerForm}>
        <form onSubmit={handleOnSubmit}>
          <TextField size='small' fullWidth name='userName' label='User Name' placeholder='Enter Your User Name' type='text' required autoComplete='username'/>
          <TextField size='small' fullWidth name='email' label='Email' placeholder='Enter Your Email' type='email' required autoComplete='email'/>
          <div className={styles.passwordContainer}>
          <TextField  size='small' fullWidth name='password' label='password' placeholder='Password' type={showPassword ? 'text' : 'password'} required autoComplete='new-password'/>
          <button onClick={handlePasswordVisibility} type='button'>{showPassword ? <Visibility /> :<VisibilityOff />}</button>
          </div>
          <Button variant='contained' fullWidth type='submit'>{loading ? 'Loading....' : 'Signup'}</Button>
        </form>
      </div>
      <div className={styles.googleLogin}><Button fullWidth variant='outlined' startIcon={<FcGoogle />} 
      onClick={googleSignup}
      >SignUp with google</Button></div>
      <div className="signup">
        <Link to={'/'}>already have an account!!! click here to Login </Link>
      </div>
    </div>
    </div>
  )
}

export default Signup