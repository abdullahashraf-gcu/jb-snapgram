import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import  {Button } from "../../components/ui/button";
import LikedPosts from "../../components/shared/likedposts";
import { useUserContext } from "@/context/authcontext";
import  {useGetUserById } from "../../lib/react-query/queries";
import   Loader  from "@/components/shared/loader";
import GridPostList from "../../components/shared/gridpostlist";
import placeImg from "../../assets/icons/profile-placeholder.svg"
import editImg from "../../assets/icons/edit.svg"
import postImg from "../../assets/icons/posts.svg"
import likedImg from "../../assets/icons/like.svg"


interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);
const Profile = () => {
  const{id}=useParams();
  const {user}=useUserContext();
  const {pathname}=useLocation();

     if(!id)throw Error;

  const{data:profileUser}=useGetUserById(id || "");
 
  
  if( !profileUser){
       
    return(
       <div className="flex-center w-full h-full">
        <Loader />
        
      </div>
    );
     }
  
 
  return (
    <div className="profile-container">
      <div className="profile-inner_container"> 
          <div className="flex lg:flex-row flex-col max-lg:items-center flex-1 gap-7">
              <img src={profileUser.imageUrl || placeImg } alt="profile"
              className="w-28 h-28 lg:h-36 lg:w-36 rounded-full" />

              <div className="flex flex-col flex-1 justify-between md:mt-2">
                  <div className="flex flex-col w-full">
                    <h1 className="text-center xl:text-left h1-semibold w-full">
                      {profileUser.name}
                    </h1>
                    <p className="body-medium text-light-3 text-center xl:text-left">
                      @{profileUser.username}
                    </p>
                </div>

                
                <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                  <StatBlock value={profileUser.posts.length} label="Posts" />
                  <StatBlock value={20} label="Followers" />
                  <StatBlock value={20} label="Following" />
                </div>

                <p className="base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                  {profileUser.bio}
                </p>
           </div>

           <div className="flex justify-center gap-4">
             <div className={`${(user.id!==profileUser.$id) && "hidden" } `}>
              <Link to={`/update-profile/${profileUser.$id}`}
              className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg $ ${(user.id!==profileUser.$id) && "hidden" } `}
              >
              
                <img
                    src={editImg}
                    alt="edit"
                    width={20}
                    height={20}
                  />
                  <p className="flex whitespace-nowrap small-medium">
                    Edit Profile
                  </p>

              </Link>
             </div>

             <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
           </div>
        </div>
      </div>
      {
        profileUser.$id === user.id && (
          <div className="flex max-w-5xl">
             <Link to={`/profile/${id}`}
             className={`profile-tab rounded-l-lg ${
              (pathname===`/profile/${id}`) && "!bg-dark-3"
             }`}
             > 
                <img
                  src={postImg}
                  alt="posts"
                  width={20}
                  height={20}
                />
                Posts
             </Link>
             <Link to={`/profile/${id}/liked-posts`}
             className={`profile-tab rounded-r-lg ${
              (pathname===`/profile/${id}/liked-posts`) && "!bg-dark-3"
             }`}
             > 
                <img
                  src={likedImg}
                  alt="posts"
                  width={20}
                  height={20}
                />
                Liked Posts
             </Link>
           

          </div>
        )
      }
      <Routes>
        <Route
        index
        element={<GridPostList posts={profileUser.posts} showUser={false}/>}/>

        {
          (profileUser.$id===user.id)&&(<Route path="/liked-posts" element={<LikedPosts/>}
        />)
        }
        
      </Routes>
      <Outlet/>

    </div>
  )
}

export default Profile