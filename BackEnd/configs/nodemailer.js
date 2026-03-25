  import nodemailer from 'nodemailer'
  import dotenv from 'dotenv'

  dotenv.config()


  const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    secure:'true',
    port:465,
    auth:{
      user:process.env.GMAIL_MAIL,
      pass:process.env.GMAIL_APP_PASSWORD
    },
    connectionTimeout: 10000, 
    greetingTimeout: 10000,
    socketTimeout: 10000
  })

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