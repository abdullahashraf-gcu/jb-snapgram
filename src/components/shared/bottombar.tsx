import { Link, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";
import home from '../../assets/icons/home.svg'
import bookmark from '../../assets/icons/bookmark.svg'
import gallery from '../../assets/icons/gallery-add.svg'
import explore from '../../assets/icons/wallpaper.svg'

const BottomBar = () => {
  const urlArray=[home,explore,bookmark,gallery]
  const {pathname}= useLocation();
  return (
    <section className="bottom-bar">
     {
      bottombarLinks.map((link)=>{
        const isActive= pathname==link.route;
        return (
        <Link
        to={link.route}
        key={`bottombar-${link.label}`}
         className={`${isActive && "rounded-[10px] bg-primary-500"}
         flex-center flex-col gap-1 p-2 transition`}
        >
           <img src={urlArray[link.imgURL]} alt={link.label} width={16} height={16}
           className={`${isActive && " invert brightness-0 transition"}`} />

           <p className="tiny-medium text-light-2">{link.label}</p>
        </Link>)
})
     }
    </section>
  )
}

export default BottomBar