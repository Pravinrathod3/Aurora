import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import App from '../App'
import Productdetailpage from '../Pages/Productdetailpage'
import LoginPage from '../Pages/loginpage'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

function Routingpage() {
  
   const location = useLocation();
   const hidelayoutroutes = ["/login"];
   const hidelayout = hidelayoutroutes.includes(location.pathname);


  return (
    <>
      {!hidelayout && <Navbar />}
      <Routes>
       <Route path="/" element={<App />} />
       <Route path="/product/:id" element={<Productdetailpage />} />
       <Route path="*" element={<h1 className='text-3xl text-center'>404 Not Found</h1>} />
       <Route path="/login" element={<LoginPage />} />
     </Routes>
     {!hidelayout && <Footer />}
    </>
    
  )
}

export default Routingpage