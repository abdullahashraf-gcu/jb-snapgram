import Loader  from "@/components/shared/loader";
import GridPostList from "@/components/shared/gridpostlist";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;
