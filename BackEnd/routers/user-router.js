import express from 'express' 
import {signupUser,signInUser,getToken,logoutUser,verifyUser} from '../controllers/user-controller.js'
import {authenticateUser} from '../middlewares/Authenticate-User.js'

const router=express.Router()

router.post('/signup-user',signupUser)
router.post('/login-user',signInUser)
router.get('/get-token',authenticateUser,getToken)
router.get('/logout',authenticateUser,logoutUser)
router.get('/verify-user',authenticateUser,verifyUser)

export default router