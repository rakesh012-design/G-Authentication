  import nodemailer from 'nodemailer'
  import dotenv from 'dotenv'

  dotenv.config()


 const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  family: 4, 
  auth: {
    user: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  
  connectionTimeout: 20000, 
  greetingTimeout: 20000,
  socketTimeout: 20000,
  
  tls: {
    servername: 'smtp.gmail.com'
  }
});

  export const sendWelcomeEmail=async(email,userName)=>{
    try{
      await transporter.sendMail({
        from:'The No Name App',
        to:email,
        subject:'Welcome To The App',
        html:`<h1>Welcome, ${userName}!</h1><p>We're glad to have you.</p>`
      })
      console.log(`mail sent to ${email}`)
    }catch(e){
      console.log(e)
      throw Error(e.message)
    }
  }