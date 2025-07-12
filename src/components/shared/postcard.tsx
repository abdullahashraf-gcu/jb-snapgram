
import type { Models } from "appwrite";
import { Link } from "react-router-dom";

import  PostStats  from "../shared/poststats";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "../../context/authcontext";
import profilePlace from "../../assets/icons/profile-placeholder.svg";
import updateImage from "../../assets/icons/edit.svg"
import postPlace from "../..//assets/icons/profile-placeholder.svg"

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({post}:PostCardProps) => {
    const {user}=useUserContext();
    if(!post.creator) return;
    
  return (
    <div className="post-card ">
       <div className="flex-between">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.creator.$id}`}>
              <img src={post.creator?.imageUrl||profilePlace} alt="Creator" 
              className="w-12 lg:h-12 rounded-full"/>
            </Link>

            <div className="flex flex-col ">
                <p className="body-bold ">
                {post.creator.name}
                </p>

                <div className="flex-center gap-2 text-light-3">
                 <p className="small-regular">
                  {multiFormatDateString(post.$createdAt)}  
                 </p>
                 •
                 <p className="small-regular">
                 {post.location}
                 </p>
                </div>
            </div>
          </div>

          <Link to={`/update-post/${post.$id}`}
          className={`${user.id!== post.creator.$id && "hidden"}`}>
           <img src={updateImage} alt="edit" width={20}
           height={20}/>
          </Link>
       </div>

       <Link to={`/post/${post.$id}`}>
       <div className="base-medium py-5">
           <p>{post.caption}</p>
           <ul className="flex gap-1 mt-2">
            {
                post.tags.map((tag:string,index:string)=>(
                    <li key={`${tag}${index}`} className="text-light-3 small-regular">
                    #{tag}
                    </li>
                ))
            }
           </ul>
       </div>

        <img
          src={post.imageUrl || postPlace}
          alt="post image"
          className="post-card_img"
        />
       </Link>
       <PostStats post={post} userId={user.id}/>
    </div>
  )
}

export default PostCard