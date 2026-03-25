import {Resend} from 'resend'
import dotenv from 'dotenv' 
dotenv.config()

const resend=new Resend(process.env.RESEND_API_KEY)

export const ResendSendWelcomeEmail=async(email,userName)=>{
  try{
    await resend.emails.send({
      from:'onboarding@resend.dev',
      to:email,
      subject:'Welcome OnBoard',
      html:`<h1>welcome to our app</h1> <p>Hi, ${userName} we are glad you are here, hope u find our app useful </p> <br>`
    })
    console.log('email has been sent to ',email)
  }catch(e){
    console.log(e)
    throw new Error(e.message)
  }
} 