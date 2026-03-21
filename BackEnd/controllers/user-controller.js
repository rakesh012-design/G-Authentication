import {valuesMissingError,duplicateEmailError} from './Error.js'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,getAuth} from 'firebase/auth'
import {doc,setDoc,serverTimestamp, getDoc,collection} from 'firebase/firestore'
import admin from '../configs/firebaseAdmin.js'
import CustomError from './Error.js'
import User from '../models/User.js'
import {sendWelcomeEmail} from '../configs/nodemailer.js'


export const signupUser=async(req,res,next)=>{
  try{
    const {userName,email,uid,idToken}=req.body
    if(!email ||  !userName){
      throw valuesMissingError()
    }
    /*
    const emailCheck=await admin.firestore().collection('users').where('email','==',email).get()
    if(!emailCheck.empty){
      throw duplicateEmailError()
    }
    
    const userCredential=await createUserWithEmailAndPassword(auth,email,password)
    const user=userCredential.user*/
    const newUser=new User({
      uid,
      email,
      userName
    })
    //await sendEmailVerification(user)
    await admin.firestore().collection('users').doc(uid).set(newUser.toFireStore())
    await sendWelcomeEmail(email,userName)
    const sessionCookie=await admin.auth().createSessionCookie(idToken,{expiresIn:1000*60*10})
    res.cookie('session',sessionCookie,{
      maxAge:60*10*1000,
      httpOnly:true,
      secure:false,
      sameSite:'Strict'
    })  
    return res.status(200).json({success:true,message:'User Created Successfully'})
    
  }catch(e){
    next(e)
  }
}

export const signInUser=async(req,res,next)=>{
  
  try{
    console.log('in sign in user')
    /*
    console.log('in signInuser')
    console.log(req.headers.authorization)
    const {email,password}=req.body
    
    if(!email || !password){
      throw valuesMissingError()
    }
    const userCredentials=await signInWithEmailAndPassword(auth,email,password)
    const user=userCredentials.user
    console.log(user)
    //const userDoc=await getDoc(doc(db,'users',user.uid))
    //const userData=userDoc.data()
    const userIdToken=await user.getIdToken()*/
    const {idToken}=req.body
    const sessionCookie=await admin.auth().createSessionCookie(idToken,{expiresIn:60*10*1000})
    res.cookie('session',sessionCookie,{
      maxAge:60*10*1000,
      httpOnly:true,
      secure:false,
      sameSite:'Strict'
    })
    return res.status(200).json({success:true,message:'user Logged In successfully'})

  }catch(e){
    console.log(e)
    next(e)
  }
}

export const getToken=async(req,res,next)=>{
  try{
    const userId=req.userId
    const userDoc=await admin.firestore().collection('users').doc(userId).get()
    //const userCollection=await admin.firestore().collection('users')
    //const usersSnapshot=await userCollection.get()
    /*const allUsers=usersSnapshot.docs.map((document)=>(
      {...document.data()}
    ))*/
    
    const user=await userDoc.data()
    //console.log('this is user',user);
    
    return res.status(200).json({success:true,message:'user Details Fetched',user})
  }catch(e){
    next(e)
  }
}

export const logoutUser=async(req,res,next)=>{
  try{
    if(!req.cookies.session){
      throw new CustomError(400,'user is not logged in or has already logged out')
    }
    res.clearCookie('session')
    res.status(200).json({success:true,message:'Logged out successfully'})
  }catch(e){
    next(e)
  }
}

export const verifyUser=async(req,res,next)=>{
  try{
    const userId=req.userId
    const user=await (await admin.firestore().collection('users').doc(userId).get()).data()
    await sendEmailVerification(user.email)
    res.status(200).json({success:true,message:'Verification Email sent',user})
  }
  catch(e){
    next(e)
  }
}
