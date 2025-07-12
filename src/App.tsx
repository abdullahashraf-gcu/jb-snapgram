import{Routes,Route} from 'react-router-dom'
import SigninForm from './_auth/forms/signinform.jsx'
import SignupForm from './_auth/forms/signupform.jsx'
import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
  
} from './_root/pages'
import AuthLayout from './_auth/authlayout.js'
import RootLayout from './_root/rootlayout.js'
import { Toaster } from "@/components/ui/sonner"

function App() {
 

  return (
    <>
    <main className='flex h-screen'>
    <Routes>
      {/* public routes */}
      <Route element={<AuthLayout/>}>
          <Route path='/sign-in' element={<SigninForm/>}/>
          <Route path='/sign-up' element={<SignupForm/>}/>
      </Route>
      
      {/* private routes */}
      <Route element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/saved' element={<Saved/>}/>
        <Route path='/all-users' element={<AllUsers/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:id' element={<EditPost/>}/>
        <Route path='/post/:id' element={<PostDetails/>}/>
        <Route path='/profile/:id/*' element={<Profile/>}/>
        <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
      </Route>

    </Routes>
    <Toaster richColors  />
    </main>
    </>
  )
}

export default App
