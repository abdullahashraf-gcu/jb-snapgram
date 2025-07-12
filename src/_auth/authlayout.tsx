import { Navigate, Outlet } from "react-router-dom";
import SideImg from '../assets/images/sidee-img.jpg'

const AuthLayout = () => {
  const isAuthenticated = false;

  return( <>
 
    {
      isAuthenticated ? <Navigate to="/" /> : 
      <>
      <section className="flex flex-1 flex-col justify-center items-center py-10">
        <Outlet />
      </section>
      <img
            src={SideImg}
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
      </>
    }
    
     </>

  )

};

export default AuthLayout;

