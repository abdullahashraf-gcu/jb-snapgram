import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../components/ui/form";
import {Button,} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Textarea,} from "../../components/ui/textarea";
import { useParams } from "react-router-dom";
import { toast } from "sonner"
import { useUserContext } from"../../context/authcontext";
import   Loader  from "../../components/shared/loader";
//import FileUploader from "../shared/fileuploader";
import {  useGetUserById,  useUpdateUser } from "@/lib/react-query/queries";
import editImage from "../../assets/icons/edit.svg"
import { ProfileValidation } from "@/lib/validations";
import ProfileUploader from "@/components/shared/profileuploader";


const UpdateProfile = () => {
  const navigate = useNavigate();
  const{id}=useParams();
  const {user,setUser}= useUserContext();
  console.log(user)
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
     file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  })
  const{data:profileUser}=useGetUserById(id||"")
  const {mutateAsync:updateUser , isPending:isUpdateLoading}=useUpdateUser();

  if (!profileUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
 
  // 2. Define a submit handler.
  async function onSubmit(value: z.infer<typeof ProfileValidation>) {
    if(!profileUser)return;
   
   const updatedUser= await updateUser({
     userId: profileUser.$id,
      name: value.name,
      bio: value.bio,
      file: value.file,
      imageUrl: profileUser.imageUrl,
      imageId: profileUser.imageId,
   })

   console.log(updatedUser);
   
   setUser({...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,});
      if(!updatedUser)
    { toast.error("User not updated , Try Again")}
   else{
      toast.success("Profile Updated Succesfully")
    }
     return navigate(`/profile/${id}`)
  }
  return (
    <>
    <div className='flex flex-1 scrollbar-home'>
      <div className='common-container'>
       <div className='max-w-5xl flex-start justify-start gap-3 w-full'>
          <img src={editImage}
          alt="add"
          width={36}
          height={36} />
          <p className='h2-bold text-left w-full'>Edit Profile</p>  
       </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

               <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <ProfileUploader fieldChange={field.onChange}
                      mediaUrl={profileUser.imageUrl}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-md" >Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-md" >Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} disabled className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-md" >Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} disabled className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 cursor-not-allowed"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-md" >Bio</FormLabel>
                    <FormControl>
                    <Textarea
                  className="h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 custom-scrollbar "
                  {...field}
                /> </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isUpdateLoading}>
                {isUpdateLoading && <Loader />}
                Update Profile
              </Button>
            </div>
            </form>
          </Form>
      </div>

    </div>
   
  
  </>
)
}

export default UpdateProfile