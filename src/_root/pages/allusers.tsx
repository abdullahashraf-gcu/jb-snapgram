import { useGetAllUsers } from '@/lib/react-query/queries';
import usersImg from "../../assets/icons/6012823.png"
import ProfileCard from '@/components/shared/profilecard';
import Loader from '@/components/shared/loader';

const AllUsers = () => {
    const {data: allUsers,isLoading}=useGetAllUsers();
    console.log(allUsers)
    if (isLoading && !allUsers){
    return ( <div className='flex items-center justify-center w-full h-full'>
         <Loader/>
      </div>)
    }
  return (
     <div className="flex flex-col flex-1 w-full max-w-5xl pt-10 px-10">
        <div className="flex items-center gap-2 mb-10 mt-10">
          <img src={usersImg} alt="" width={50} height={50} className="invert-white"  />
             <h3 className="h1-bold ">All Users Accounts</h3>
        </div>
         
          
          <ul className="user-grid">
            {allUsers?.documents.map((user) => (
              <li key={user?.$id} className="flex-1 min-w-[200px] w-full  ">
                <ProfileCard user={user}/>
              </li>
            ))}
          </ul>
      </div>  )
}

export default AllUsers