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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageLayout />}>
      <Route element={<RequireUser />}>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/" element={<Play />}/>
        <Route path="/game" element={<Game />}/>
      </Route>
      <Route path="/signin" element={<AuthPage />}/>
      <Route path="/signup" element={<AuthPage />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SocketProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </SocketProvider>
)
