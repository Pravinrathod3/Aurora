import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router} from "react-router-dom";
import {SearchContextProvider} from './Pages/Context/SearchContextProvider.jsx';
import Routingpage from './RoutingFile/Routingpage.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchContextProvider>
    <Router>
        <Routingpage />
    </Router>
    </SearchContextProvider>
  </StrictMode>,
)
