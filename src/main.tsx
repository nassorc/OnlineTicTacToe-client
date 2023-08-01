import ReactDOM from 'react-dom/client'
import ContextProvider from './components/ContextProvider.tsx';
import Router from './lib/RouterProvider.tsx';
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <Router />
  </ContextProvider>
)
