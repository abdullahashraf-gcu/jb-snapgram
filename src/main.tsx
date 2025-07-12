import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from "./context/authcontext.tsx";
import { QueryProvider } from "./lib/react-query/queryprovider.tsx";

createRoot(document.getElementById('root')!).render(
 <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
)
