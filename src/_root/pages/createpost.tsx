import addImage from "../../assets/icons/add-post.svg"
import PostForm from "@/components/forms/postform"
const CreatePost = () => {
  return (
    <div className='flex flex-1 scrollbar-home '>
      <div className='common-container'>
       <div className='max-w-5xl flex-start justify-start gap-3 w-full'>
      <img src={addImage}
       alt="add"
       width={36}
       height={36} />
       <p className='h3-bold md:h2-bold text-left w-full'>Create Post</p>  
       </div>

       <PostForm action="Create"/>
      </div>

    </div>
  )
}

export default CreatePost