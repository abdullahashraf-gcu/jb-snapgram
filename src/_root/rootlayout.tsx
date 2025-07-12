import { useUserContext } from "@/context/authcontext"
import TopBar from '../components/shared/topbar.tsx'
import LeftBar from '../components/shared/leftbar.tsx'
import BottomBar from '../components/shared/bottombar.tsx'
import { Outlet, useNavigate } from "react-router-dom"
import Loader from "@/components/shared/loader.tsx"


const RootLayout = () => {
  const navigate= useNavigate();

  const{isAuthenticated,isLoading}=useUserContext();
     if (isLoading){
      return (
        <div className="flex w-full h-full items-center justify-center">
          <Loader/>
        </div>
      )
     }
     if(!isAuthenticated && !isLoading){
      navigate('/sign-in')
     }
  return (
    <div  className="w-full md:flex" >
      <TopBar/>
      <LeftBar/>

      <section className="flex flex-1 h-full">
        <Outlet/>
      </section >
      
      <BottomBar/>
     
    </div>
  )
}

export default RootLayout