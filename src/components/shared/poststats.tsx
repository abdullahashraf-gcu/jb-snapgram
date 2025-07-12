import  type { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";
import notLiked from "../../assets/icons/like.svg"
import Liked from "../../assets/icons/liked.svg"
import notSaved from "../../assets/icons/save.svg"
import Saved from "../../assets/icons/saved.svg"
import { getCurrentUser } from "@/lib/appwrite/api";
import type { Mode } from "fs";
import Loader from "./loader";

type PostStatsProps={
    post:Models.Document;
    userId:string;
}
const PostStats = ({post,userId}:PostStatsProps) => {
 
    const location = useLocation();
   
    const likesList = post.likes.map((user:Models.Document)=>user.$id);
   

     const [likes, setLikes] = useState<string[]>  (likesList);
     const [isSaved, setIsSaved] = useState(false);

    const{mutate:likePost}=useLikePost();
    const{mutate:savePost, isPending:isSavingPost}=useSavePost();
    const{mutate:deleteSavePost, isPending:isDeletingPost}=useDeleteSavedPost();

    const{data: currentUser}= useGetCurrentUser();

    const savedPostRecord = currentUser?.save.find((record: Models.Document)=>record.post.$id === post.$id )
    
    useEffect(()=>{
        setIsSaved(!!savedPostRecord)
    },[currentUser])
    const handleLikePost = (
        e:React.MouseEvent<HTMLImageElement, MouseEvent>
    )=>{
        e.stopPropagation();

        let likesArray=[...likes];
        if(likesArray.includes(userId)){
            likesArray  = likesArray.filter((Id)=>Id!==userId)
        }
        else{
            likesArray.push(userId);
        }
      
        setLikes(likesArray);
        likePost({postId:post.$id,likesArray})
    }
    const handleSavePost = ( e:React.MouseEvent<HTMLImageElement, MouseEvent>)=>{
    e.stopPropagation();
    if(savedPostRecord){
        setIsSaved(false)
        return deleteSavePost(savedPostRecord.$id)
    }else{
        setIsSaved(true);
        savePost({userId: userId , postId:post.$id});
    }
    }
    return (
    <div className="flex justify-between items-center  bg-black/20 backdrop-blur-xs p-1 rounded-sm">
    <div className="flex gap-2 mr-5">
        <img src={`${
            checkIsLiked(likes, userId)
              ? Liked
              :notLiked
          }`}
           alt="like" width={20} height={20} 
           onClick={(e)=>handleLikePost(e)} />
        <p className="base-medium">{likes.length}</p>
    </div>
    <div className="flex gap-2 ">
        {
            (isSavingPost || isDeletingPost) ?<Loader/>:
            (
            <img src={isSaved ? Saved : notSaved} alt="save"  width={20} height={20} onClick={(e)=>handleSavePost(e)}/>
            )
        }


    </div>
    </div>
  )
}

export default PostStats