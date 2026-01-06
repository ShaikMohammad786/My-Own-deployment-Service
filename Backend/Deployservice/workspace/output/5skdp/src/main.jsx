import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Nav from './Components/Nav.jsx'
import Manager from './Components/Manager.jsx'
import Footer from './Components/footer.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className="flex flex-col min-h-screen">
    <Nav />

 <main className="flex-grow">
        <App />
        <Manager />
      </main>


    <Footer/>
    </div>

  </StrictMode>,
)
