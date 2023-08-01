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

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string()
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
    <Form {...form}>
      <form 
        className="space-y-4"
        onSubmit={form.handleSubmit(onSignin)}
      >

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

      <p>Don't have an accout? <Link to="/signup">Sign up</Link></p>

    </Form>
  )
  // return (
  //   <>
  //     {authState?.error && <p className='text-red-400'>{authState.error}</p>}
  //     <div className='flex flex-col gap-3'>
  //       {authSignInInputs?.map(inputAttr => {
  //         return <FormInput key={inputAttr.id} {...inputAttr} value={values[inputAttr.name]} onChange={handleChange}/>
  //       })}
  //     </div>
  //     <button onClick={handleSignIn} className='w-full bg-primary-300 hover:bg-primary-400'>Sign in</button>
  //     <Button>try</Button>
  //     <p>Don't have an accout? <Link to="/signup">Sign up</Link></p>
  //   </>
  // )
}