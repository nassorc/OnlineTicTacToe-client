import { useState } from 'react';
import { useAuth, signInUser, AUTH_ACTIONS } from '../../context/auth';
import { useNavigate, Link } from 'react-router-dom';
import { authSignInInputs } from '../../config/authentication';
import { FormInput } from './FormInput';

export default function SignInForm() {
  const navigate = useNavigate();
  const [authState, authDispatch] = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
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
      {authState?.error && <p className='text-red-400'>{authState.error}</p>}
      <div className='flex flex-col gap-3'>
        {authSignInInputs?.map(inputAttr => {
          return <FormInput key={inputAttr.id} {...inputAttr} value={values[inputAttr.name]} onChange={handleChange}/>
        })}
      </div>
      <button onClick={handleSignIn} className='w-full bg-primary-300 hover:bg-primary-400'>Sign in</button>
      <p>Don't have an accout? <Link to="/signup">Sign up</Link></p>
    </>
  )
}