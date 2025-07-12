import { Button } from "@/components/ui/button"
import {FormControl,Form, FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Link ,useNavigate} from "react-router-dom"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import logo from '../../assets/images/logo.svg'
import Loader from "@/components/shared/loader"
import { toast } from "sonner"
import { useUserContext } from "../../context/authcontext.tsx";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries.tsx"



const SignupForm = () => {
   const { checkAuthUser, isLoading: isUserLoading ,isAuthenticated } = useUserContext();
   const navigate= useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password:""
    },
  })

  const{mutateAsync: createUserAccount,isPending:isCreatingUser}=useCreateUserAccount();
  const{mutateAsync: signInAccount, isPending:isSigningInUser}=useSignInAccount();
  
if(isAuthenticated){
 navigate('/')
}

  // 2. Define a submit handler.
  async function handleSignup(user: z.infer<typeof SignupValidation>) {
    try {
      
   const newUser = await createUserAccount(user);
   if(!newUser){
    toast.error('Sign Up failed , Please try again later');
   }else{
    toast.success('Sign Up succesful');
   }
   
  const session =  await signInAccount({email:user.email,password:user.password});
  if(!session){
    toast.error('Something went wrong , please login again');
    navigate('/sign-up')
    return;
  }
   const isLoggedIn=await checkAuthUser();
   console.log(isLoggedIn);
   if(isLoggedIn){
    navigate('/')
   }else{
   
    toast.error('Login Failed. Please try again.')
   }
   } catch (error) {
      console.log(error)
    }
}

  return (
    
       <Form {...form}>
        <div className="sm:w-[420px] flex-center flex-col gap-1">
         <img src={logo} alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 ">
          To use snapgram, Please enter your details
        </p>

      
      <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-5 w-full mt-4 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 " {...field} />
              </FormControl>
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
                <Input type='text' className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 " {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-2">{(isCreatingUser || isSigningInUser|| isUserLoading)?
          (<div className="flex-center gap-2">
            <Loader/> Loading...
        </div>):('Sign Up') }</Button>
       <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
      </form>
      </div>
    </Form>

    
  )
}


export default SignupForm