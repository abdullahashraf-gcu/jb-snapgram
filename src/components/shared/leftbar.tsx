import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { INavLink } from "@/types";
import { sidebarLinks } from "../../constants/index";
import Loader  from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/authcontext";

import logo from '../../assets/images/logo.svg'
import logout from '../..//assets/icons/logout.svg'
import home from '../../assets/icons/home.svg'
import people from '../../assets/icons/people.svg'
import bookmark from '../../assets/icons/bookmark.svg'
import gallery from '../../assets/icons/gallery-add.svg'
import explore from '../../assets/icons/wallpaper.svg'
import { toast } from "sonner";

const LeftBar = () => {
   const navigate = useNavigate();
   const {pathname}=useLocation();
   const{user,setUser,isLoading,setIsAuthenticated}=useUserContext();
   
   const urlArray=[home,explore,people,bookmark,gallery];
  
    const {mutate: signOut,isSuccess,isError}=useSignOutAccount();

        const handleSignOut = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            signOut();
            };

      useEffect(() => {
      if (isSuccess) {
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
      navigate("/sign-in");
      }
      }, [isSuccess]);

      useEffect(() => {
      if (isError) {
      toast.error("Failed to sign out. Please try again.");
      }
      }, [isError]);
  return (
    <nav className="leftsidebar">
     <div className="flex flex-col gap-7 ">
        <Link to={"/"} className='flex gap-3 items-center ml-2' >
          <img src={logo} alt="" width={170} height={36}/>
        </Link >
        {
          isLoading||!user.email?
          (<div>
            <Loader/>
          </div>):
          (
            <Link to={`/profile/${user.id}`} className=" flex gap-4 items-center">
             <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
            </Link>
          )
        }

        <ul className="flex flex-col gap-6">
         {
          sidebarLinks.map((link:INavLink)=>{
            const isActive = pathname === link.route;

            return(
              <li key={link.label}
              className={`leftsidebar-link group ${isActive&&"bg-primary-500"}`}>
                <NavLink
                 to={link.route}
                 className="flex gap-4 item-center p-4"
                 >
               <img src={urlArray[link.imgURL]} alt={link.label}
                  className={`group-hover:invert group-hover:brightness-0 group-hover:transition ${
                      isActive && "invert-white"
                    }`} />
                  {link.label}
                </NavLink>
              </li>
            )
          })
         }

        </ul>
     </div>
       <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={(e) => handleSignOut(e)}>
            <img src={logout} alt="logout" />
            <p className="">Logout</p>
          </Button>
    </nav>
  )
}

export default LeftBar