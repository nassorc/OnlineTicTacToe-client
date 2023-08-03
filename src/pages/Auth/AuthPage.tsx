import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignInForm from '../../components/auth/Signin';
import SignUpForm from '../../components/auth/Signup';
import { useAuth } from '../../context/auth';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate()
  const [authState, authDispatch] = useAuth();

  useEffect(() => {
    if((authState as any).userId && (authState as any).accessToken) {
      navigate('/');
    }
  }, [authState]);

  const form = (location.pathname === '/signin') ? <SignInForm /> : <SignUpForm />
  return(
    // <div className='max-w-lg mx-auto grid grid-cols-1 grid-rows-4 gap-y-4'>
    <div className='mx-auto mt-10 flex flex-col justify-center items-center text-center max-w-[90%] lg:flex-row lg:mt-20 lg:space-x-20 lg:text-start'>
      {/* <h1 className='mt-auto mb-12 text-3xl text-center h-max'>{(location.pathname === '/signin') ? 'Welcome back!' : 'Create an account to start playing with friends'}</h1> */}
      <div className='mb-10 space-y-3'>
        <h1 className='text-4xl font-bold h-max text-site-accent brightness-90'>TTT Online</h1>
        <p className='text-xl'>Online tictactoe application. Play with friends<br/>or battle againts other people for their elo.</p>
      </div>
      <div className='row-start-2 grid gap-4'>
        {form}
      </div>
    </div>
  )
}