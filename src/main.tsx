import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { persistor, store } from './redux/features/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <div  className='max-w-6xl mx-auto'> */}
    <div  className='mx-auto'>
   <HelmetProvider>
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>  
        </QueryClientProvider> 
      </PersistGate>
      <Toaster richColors={true} position='top-right'/>
    </Provider>
   </HelmetProvider>
    </div>
  </StrictMode>,
)