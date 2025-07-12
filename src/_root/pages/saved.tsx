
import type { Models } from "appwrite";
import Loader from "@/components/shared/loader";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import GridPostList from "@/components/shared/gridpostlist";
import savedImg from "../../assets/icons/save.svg"


const Saved = () => {
     const{data: currentUser, isLoading:isLoadingUser}= useGetCurrentUser();
console.log(currentUser)
     if(isLoadingUser){
      return <Loader/>
     }
     const posts:Models.Document[]= currentUser?.save.map((item:Models.Document)=>({...item.post,
        creator: {
        imageUrl: currentUser.imageUrl,
      },
     }));
     if(!posts){
      return <Loader/>
     };
   console.log(posts)
     
  return (
      <div className="flex flex-col flex-1 w-full max-w-5xl pt-10 px-10">
        <div className="flex items-center gap-2 mb-8">
          <img src={savedImg} alt="" width={45} height={45} className="invert-white"  />
             <h3 className="h1-bold ">Saved Posts</h3>
        </div>
         
          <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {
             <GridPostList posts={posts} showStats={false}/>
          }
          </div>

        
      </div>
  )
}

export default Saved