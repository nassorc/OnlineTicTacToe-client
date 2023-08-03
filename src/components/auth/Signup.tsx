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

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string()
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
    const userCredentials = await signUpUser(values as Required<SignupType>);
  }

  return (

    <div className='p-4 max-w-md min-w-[400px] bg-white rounded-sm shadow-md space-y-6'>
      <h1 className='text-start text-xl'>
        Sign up
      </h1>
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
                {/* <FormDescription>
                </FormDescription> */}
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
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex mx-auto py-6 w-full">Sign Up</Button>
        </form>
        <hr className="mx-3"/>
        <Button 
          className='bg-site-accent brightness-[97%] hover:bg-site-accent hover:brightness-100 text-site-base py-6'
          
          onClick={() => {
            navigate("/signin")
        }}>Already have an account? Sign in</Button>

      </Form>
    </div>
  )
}