import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/authcontext.jsx";
import { useSignOutAccount } from "@/lib/react-query/queries";

import logo from '../../assets/images/logo.svg'
import logout from '../..//assets/icons/logout.svg'


const TopBar = () => {
  const navigate = useNavigate();
  const{user}=useUserContext();
  const {mutate: signOut,isSuccess}=useSignOutAccount();

  useEffect(()=>{ if(isSuccess)navigate('/sign-up')}
    ,[isSuccess])

  return (
    <section className="topbar ">
      <div className="flex-between  ">
    <Link to={"/"} className='flex gap-3 items-center ml-2' >
    <img src={logo} alt="" width={130} height={325}/>
    </Link >


        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src={logout} alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar