import { useState } from 'react';
import { signUpUser } from '../../context/auth';
import { authSignUpInputs } from '../../config/authentication';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import FormShell from './FormShell';

const signupSchema = z.object({
  username: z
    .string({
      required_error: "Please enter a username",
    })
    .min(3, {
      message: "username must be atleast 3 characters"
    }),
  email: z
    .string({
      required_error: "Please enter a valid email address"
    })
    .email({
      message: "Please enter an email address"
    }),
  password: z.string({
    required_error: "Please enter a password"
  })
})
type SignupType = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const navigate = useNavigate();
  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  async function onSignUp(values: SignupType) {
    try {
      const newUser = await signUpUser(values as Required<SignupType>);
      if(newUser.status == "fail") {
        setErrorMessage(newUser.message);
      } else {
        setErrorMessage("");
        setSuccessMessage("User successfully created!")
      }
    }
    catch(err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <FormShell>
      <h1 className='text-start text-xl'>
        Sign up
      </h1>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      {successMessage && <p className='text-green-500'>{successMessage} <Link to="/signin" className='text-slate-800 cursor-pointer'>Log in</Link></p>}
      <Form {...form}>
        <form 
          className="space-y-4"
          onSubmit={form.handleSubmit(onSignUp)}
        >

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="username" type="text" {...field} className=''/>
                </FormControl>
                {/* <FormDescription>
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} className=''/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} className='' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex mx-auto py-6 w-full">Sign Up</Button>
        </form>
        <hr className="mx-3"/>
        <Button 
          className='mx-auto flex bg-site-accent brightness-[97%] hover:bg-site-accent hover:brightness-100 text-site-base py-6'
          
          onClick={() => {
            navigate("/signin")
        }}>Already have an account? Sign in</Button>

      </Form>
    </FormShell>
  )
}