import { useState } from 'react';
import { useAuth, signInUser, AUTH_ACTIONS } from '../../context/auth';
import { AuthActionType } from '../../context/auth/context';
import { useNavigate, Link } from 'react-router-dom';
import { authInputs } from '../../config/authentication';
import { FormInput } from './FormInput';

export default function SignInForm() {
  const navigate = useNavigate();
  const [authState, authDispatch] = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSignIn = async () => {
    const credentials = await signInUser(authDispatch as React.Dispatch<AuthActionType>, AUTH_ACTIONS, values);
    if(credentials) {
      navigate('/');
    }
  }
  return (
    <>
      {(authState as any).error && <p className='text-red-400'>{(authState as any).error}</p>}
      <div className='flex flex-col gap-3'>
        {authInputs?.map(inputAttr => {
          return <FormInput key={inputAttr.id} {...inputAttr} value={values[inputAttr.name]} onChange={handleChange}/>
        })}
      </div>
      <button onClick={handleSignIn} className='w-full bg-primary-300 hover:bg-primary-400'>Sign in</button>
      <p>Don't have an accout? <Link to="/signup">Sign up</Link></p>
    </>
  )
}