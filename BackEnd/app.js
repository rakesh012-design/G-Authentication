import express from 'express'
import  userRouter from './routers/user-router.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'



const app=express()
const dirName=path.resolve()





app.use(cors({
  origin:['http://localhost:5173','http://localhost:5174','http://localhost:3001'],
  credentials:true,
  allowedHeaders:['Content-Type','Authorization']
}))
app.use(express.json())
app.use(cookieParser())


app.use('/user',userRouter)

if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(dirName,'/Front-end-react/dist')))

  app.get('*path',(req,res)=>{
    res.sendFile(path.resolve(dirName,'Front-end-react','dist','index.html'))
  })
}

app.use((err,req,res,next)=>{
  const status=err.statusCode || 500
  console.log(err)
  return res.status(status).json({
    success:false,
    message:err.message,
  })
})


app.listen(3001,()=>{
  console.log('server running on http://localhost:3001')
})