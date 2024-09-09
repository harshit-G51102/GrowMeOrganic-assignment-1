import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PrimeReactProvider } from 'primereact/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <PrimeReactProvider>
      <StrictMode>
      <App />
      </StrictMode>
    </PrimeReactProvider>
</QueryClientProvider>
  
)
