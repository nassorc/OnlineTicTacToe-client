import { useState } from 'react';
import { useAuth, signUpUser } from '../../context/auth';
import { authInputs } from '../../config/authentication';
import { FormInput } from './FormInput';
import { Link } from 'react-router-dom';

export default function SignUpForm() {
  const [authState, authDispatch] = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredentials = await signUpUser(values);
      if(userCredentials) {
        setSuccessMessage('User created');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <>
      {errorMessage && <p className='text-red-400'>{errorMessage}</p>}
      {successMessage && <p className='text-green-400'>{successMessage}</p>}
      <div className='flex flex-col gap-3'>
        {authInputs?.map(inputAttr => {
          return <FormInput key={inputAttr.id} {...inputAttr} value={values[inputAttr.name]} onChange={handleChange}/>
        })}
        <button onClick={handleSignUp} className='w-full bg-primary-300 hover:bg-primary-400'>Sign up</button>
      </div>
      <p>Already have an account? <Link to='/signin'>Sign in now.</Link></p>
    </>
  )
}