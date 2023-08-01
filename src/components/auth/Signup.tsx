import { useState } from 'react';
import { signUpUser } from '../../context/auth';
import { authSignUpInputs } from '../../config/authentication';
import { Link } from 'react-router-dom';
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
              <FormLabel>username</FormLabel>
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
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Password</FormLabel>
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
        <Button type="submit" className='w-full bg-[#5CDB95]'>Signin</Button>
      </form>

      <p>Already have an account? <Link to="/signin">Sign in</Link></p>

    </Form>
  )
}