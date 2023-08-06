import { useAuth, signInUser, AUTH_ACTIONS } from '../../context/auth';
import { useNavigate, Link } from 'react-router-dom';
import { authSignInInputs } from '../../config/authentication';
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

const signinSchema = z.object({
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
type SigninType = z.infer<typeof signinSchema>;

export default function SignInForm() {
  const form = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const navigate = useNavigate();
  const [authState, authDispatch] = useAuth();

  async function onSignin(values: SigninType) {
    const credentials = await signInUser(authDispatch as React.Dispatch<AuthActionType>, AUTH_ACTIONS, values as Required<SigninType>);
    if(credentials) {
      navigate('/');
    }
  }
  return (
  <FormShell>
      {authState.error && <p className='text-red-500'>{authState.error}</p>}
      <Form {...form}>
        <form 
          className="space-y-5"
          onSubmit={form.handleSubmit(onSignin)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} className='py-6'/>
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
                  <Input placeholder="password" type="password" {...field} className='py-6' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full bg-site-accent brightness-[97%] hover:bg-site-accent hover:brightness-100 text-site-base py-6'>
            Log In
          </Button>
        </form>
        <hr className="mx-3"/>
        <Button 
          className="flex mx-auto py-6 "
          onClick={() => {
            navigate("/signup")
        }}>Create new account</Button>

      </Form>
    </FormShell>
  )
}