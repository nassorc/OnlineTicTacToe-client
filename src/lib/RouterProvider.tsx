
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

import RequireUser from "../components/RequireUser.tsx"
import { Play } from '../pages/Play';
import { UserPage } from '../pages/User/index.tsx';
import AuthPage from '../pages/Auth/AuthPage.tsx';
import PageLayout from '../components/layout/PageLayout.tsx';
import ProfilePage from '@/pages/Profile/ProfilePage.tsx';

// page router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PageLayout />}>
      <Route element={<RequireUser />}>
        <Route path="/" element={<Play />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/user/:username" element={<UserPage />}/>
      </Route>
      <Route path="/signin" element={<AuthPage />}/>
      <Route path="/signup" element={<AuthPage />}/>
    </Route>
  )
)
export default function Router() {
  return <RouterProvider router={router}/>
}

