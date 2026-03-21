import admin from "../configs/firebaseAdmin.js"
import {tokenNotAvailableError} from '../controllers/Error.js'

export const authenticateUser=async(req,res,next)=>{
  try{
    const token=req.cookies.session
    if(!token){
      throw tokenNotAvailableError()
    }
    const decodedToken=await admin.auth().verifySessionCookie(token)
    console.log(decodedToken)
    req.userId=decodedToken.uid
    next()
  }
  catch(e){
    next(e)
  }
}