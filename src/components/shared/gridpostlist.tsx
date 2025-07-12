import type { Models } from "appwrite";
import { Link } from "react-router-dom";

import  PostStats  from "../../components/shared/poststats";
import { useUserContext } from "../../context/authcontext";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
    posts,
    showUser = true,
    showStats = true,
}:GridPostListProps) => {
    const {user}= useUserContext();
    console.log(posts)

  return (
    <ul className="grid-container">
     {
        posts.map((post)=>(
            <li key={post.$id} className="relative min-w-70 h-80">
            <Link to={`/post/${post.$id}`} className="flex rounded-[24px] border border-dark-4 overflow-hidden cursor-pointer w-full h-full">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="grid-post_user ">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1  ">
                <img
                  src={
                    post.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
          </li>
        ))
     }
    </ul>  )
}

export default GridPostList