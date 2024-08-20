import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { AuthProvider } from './context/AuthContext.tsx'
import axios from 'axios'
import {Toaster} from "react-hot-toast"
// axios.defaults.baseURL = "http://localhost:8000/api/v1"
axios.defaults.baseURL = "https://my-ai-chatbot-production-sanjay.up.railway.app/api/v1"
axios.defaults.withCredentials = true;

const theme = createTheme({typography: {fontFamily: "Roboto Slab, serif", allVariants: {color: "white"}}})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Toaster position='top-right'/>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
