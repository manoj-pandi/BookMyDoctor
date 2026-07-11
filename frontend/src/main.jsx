
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AppContextProvider from './context/AppContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </HelmetProvider>
  </BrowserRouter>,
)
