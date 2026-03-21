
import './App.css'
import Login from './pages/Authentication/Login'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/main pages/Home'
import Signup from './pages/Authentication/Signup'

function App() {
  

  return (
   <Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/home' element={<Home />} />
    <Route path='/signup' element={<Signup />}/>

   </Routes>
  )
}

export default App
