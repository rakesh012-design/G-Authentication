import styles from '../../styles/home.module.css'
import {LogoutSharp,Menu,PersonOutlined} from '@mui/icons-material'
import {Button} from '@mui/material'
import {getUserData, logoutUser} from '../../store/authenticationStore'
import {useDispatch, useSelector} from 'react-redux'
import {ToastContainer,toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UserHook } from '../../hooks/userHook'

const Home = () => {
  const navigate=useNavigate()

  const store=useSelector((store)=>store.authenticationStore)
  //const user=store.user

  const {data,logout}=UserHook()

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    await logout()
  }

  const [open,setOpen]=useState(false)

  return (
    <div className={styles.main}>
      <ToastContainer autoClose={3000} position='top-center'/>
      <header>
        <ul>
         <nav>
            <button onClick={()=>setOpen(!open)}><Menu /></button>
            {open && 
            <div className={styles.menu}>
              <p className={styles.menuItem}><PersonOutlined /> {data?.userName}</p>
              <p className={styles.menuItem}>Profile</p>
              </div>
            }
          </nav>
          
          
        </ul>
       
      </header>
      <div className={styles.header}>
        <h1></h1><LogoutSharp />
        <h1>LOGOUT</h1>
        <span>click here to logout {data?.userName}</span>
        <br/>
        <span>you were created At {new Date(data?.createdAt).toLocaleString()}</span>
        </div>
      <div className={styles.content}>
        <form onSubmit={handleOnSubmit}>
          <Button fullWidth variant='outlined' type='submit' color='error' >Logout</Button>
        </form>
      </div>
      </div>
  )
}

export default Home