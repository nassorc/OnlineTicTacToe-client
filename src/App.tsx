import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Dashboard from './Dashboard.tsx';
import RequireUser from './RequireUser.tsx';
import { Play } from './pages/Play';
import { Game } from './pages/Game/index.tsx';
import AuthPage from './pages/Auth/AuthPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
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

function App() {
  return (
    <div className=''>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
