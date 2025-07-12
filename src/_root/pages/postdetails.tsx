
import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import Loader  from "../../components/shared/loader";
import PostStats  from "../../components/shared/poststats";

import {
  useGetPostById,
  // useGetUserPosts,
  useDeletePost,
  useGetUserById,
} from "@/lib/react-query/queries";
import backImage from '../../assets/icons/back.svg'
import delImage from '../../assets/icons/delete.svg'
import editImage from '../../assets/icons/edit.svg'
import placeholder from '../../assets/icons/profile-placeholder.svg'
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "../..//context/authcontext";

const PostDetails = () => {
  const navigate = useNavigate();
  const {id}= useParams();
  const {user}= useUserContext();
  const {data}=useGetUserById(user.id);
  console.log(data)

  const { data: post , isLoading}= useGetPostById(id);
  // const {data: userPosts, isLoading:isUserPostLoading}=useGetUserPosts()
  const{mutate : deletePost}=useDeletePost();

  const handleDeletePost = ()=>{
    deletePost({postId:id, imageId:post?.imageId});
    navigate(-1);
  }

  return (
    <div className="post_details-container">
     <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={backImage}
            alt="back"
            width={24}
            height={24}
          />
          <p className="base-medium">Back</p>
        </Button>
      </div>
      
      {(isLoading || !post)?(<Loader/>):
         <div className="post_details-card">

           <img src={post?.imageUrl} alt="creator" className="post_details-img" />

           <div className="post_details-info">
              <div className="flex-between w-full">
                <Link to={`/profile/${post?.creator.$id}`}
                className=" flex items-center gap-3">
                <img
                    src={
                      post?.creator.imageUrl ||
                      {placeholder}
                    }
                    alt="creator"
                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                  />
                  <div className="flex gap-1 flex-col">
                    <p className="body-bold text-light-1">
                      {post?.creator.name}
                    </p>
                    <div className="flex-center gap-2 text-light-3">
                      <p className="small-regular ">
                        {multiFormatDateString(post?.$createdAt)}
                      </p>
                      •
                      <p className="small-regular">
                        {post?.location}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex-center gap-4">
                  <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={editImage}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`post_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={delImage}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
                </div>
              </div>
             
             <hr className="border w-full border-dark-4/80" />
              <div className="flex flex-col flex-1 w-full base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
           </div>
         </div>
         
      
      }
    </div>
  )
}

export default PostDetails