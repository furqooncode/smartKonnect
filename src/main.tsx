import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './Context/ToggleTheme.tsx'
import { ChatProvider } from './Context/Chatcontext.tsx'
import { AuthProvider } from './Context/Auth.tsx'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <ChatProvider>
            <App />
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
        </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
