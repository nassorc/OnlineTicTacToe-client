import { useLocation, useNavigate } from 'react-router-dom';
import SignInForm from '../../components/auth/Signin';
import SignUpForm from '../../components/auth/Signup';
import { useAuth } from '../../context/auth';
import { useEffect } from 'react';
export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate()
  const [authState, authDispatch] = useAuth();

  useEffect(() => {
    if((authState as any).userId && (authState as any).accessToken) navigate('/');
  }, [authState]);

  const form = (location.pathname === '/signin') ? <SignInForm /> : <SignUpForm />
  return(
    <div className='max-w-lg mx-auto grid grid-cols-1 grid-rows-4 gap-y-4'>
      <h1 className='mt-auto mb-12 text-3xl text-center h-max'>{(location.pathname === '/signin') ? 'Welcome back!' : 'Create an account to start playing with friends'}</h1>
      <div className='row-start-2 grid gap-4'>
        {form}
      </div>
    </div>
  )
}