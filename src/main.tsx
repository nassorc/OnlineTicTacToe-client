import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import Dashboard from './Dashboard.tsx';
import RequireUser from './RequireUser.tsx';
import { AuthProvider } from './context/auth/context.tsx';
import { Play } from './pages/Play';
import { Game } from './pages/Game/index.tsx';
import { SocketProvider } from './context/socket/index.tsx';
import AuthPage from './pages/Auth/AuthPage.tsx';
import PageLayout from './PageLayout.tsx';
import TryNew from './pages/tryNew/index.tsx';
import NewGame from './pages/Game/NewGame.tsx';
import { NotificationProvider } from './context/notifications/index.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageLayout />}>
      <Route element={<RequireUser />}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/" element={<Play />}/>
        {/* <Route path="/game" element={<Game />}/> */}
        <Route path="/game" element={<NewGame />}/>
        <Route path="/try" element={<TryNew />}/>
      </Route>
      <Route path="/signin" element={<AuthPage />}/>
      <Route path="/signup" element={<AuthPage />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SocketProvider>
    <AuthProvider>
      {/* <NotificationProvider> */}
        <RouterProvider router={router} />
      {/* </NotificationProvider> */}
    </AuthProvider>
  </SocketProvider>
)
