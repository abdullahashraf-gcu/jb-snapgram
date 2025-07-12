import { useParams } from "react-router-dom";

import  Loader  from "../../components/shared/loader";
import PostForm from "../../components/forms/postform";
import { useGetPostById } from "@/lib/react-query/queries";
import addImage from "../../assets/icons/add-post.svg"



const EditPost = () => {
   const {id}=useParams();
   const{data:post,isLoading}= useGetPostById(id);

   if(isLoading)
    return(
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
   
  return (
   <div className='flex flex-1 '>
        <div className='common-container'>
         <div className='max-w-5xl flex-start justify-start gap-3 w-full'>
        <img src={addImage}
         alt="add"
         width={36}
         height={36} />
         <p className='h3-bold md:h2-bold text-left w-full'>Edit Post</p>  
         </div>
          {isLoading?<Loader/>:<PostForm action="Update" post={post}/>}
        </div>
  
      </div>
  )
}

export default EditPost