import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import {SearchContextProvider} from './Pages/Context/SearchContextProvider.jsx';
import Productdetailpage from './Pages/Productdetailpage.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchContextProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/product/:id" element={<Productdetailpage />} />
      </Routes>
      <Footer />
    </Router>
    </SearchContextProvider>
  </StrictMode>,
)
