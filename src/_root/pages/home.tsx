import Loader from "@/components/shared/loader"
import PostCard from "@/components/shared/postcard"
import ProfileCard from "@/components/shared/profilecard"
import { hello } from "@/lib/appwrite/api"
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries"
import type { Models } from "appwrite"


const Home = () => {
   async function run() {
  const collec = await hello();
  console.log(collec);
}

run();

  const{data:posts,isLoading:isPostLoading,isError:isErrorPosts}=useGetRecentPosts();
   const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

     if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1">
      <div className="home-container custom-scrollbar">
         <div className="home-posts">
          <h2 className="h2-bold text-left w-full">Home Feed</h2>
          {
            (isPostLoading &&!posts)?(<Loader/>):(
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.documents.map((post: Models.Document)=>(
                    <li key={post.$id} className="flex justify-center w-full">
                    < PostCard post={post}/>
                    </li>
            ))
                }
              </ul>
            )
          }

         </div>
      </div>
       
       <div className="hidden xl:flex flex-col w-72 2xl:w-465 px-6 py-10 gap-10  overflow-scroll custom-scrollbar">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <ProfileCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  )
}

export default Home