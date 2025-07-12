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
} from "../ui/form";
import {Button,} from "../ui/button";
import {Input} from "../ui/input";
import {Textarea,} from "../ui/textarea";

import type { Models } from "appwrite";

import { PostValidation } from "../../lib/validations";
import { toast } from "sonner"
import { useUserContext } from"../../context/authcontext";
import   Loader  from "../../components/shared/loader";
import FileUploader from "../shared/fileuploader";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";

type PostFormProps = {
  post?: Models.Document ;
  action: "Create" | "Update";
};

const PostForm = ({post,action} : PostFormProps) => {
    const navigate = useNavigate();
    const {user}= useUserContext();

     const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
     defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  })

 const {mutateAsync: createPost , isPending: isLoadingCreate}= useCreatePost();

 const{mutateAsync:updatePost , isPending:isLoadingUpdate}=useUpdatePost();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
   if(post && action === "Update"){
    const updatedPost = updatePost({
      ...values,
      postId:post.$id,
      imageId: post.imageId,
      imageUrl: post.imageUrl,
    })
    if(!updatedPost){
      toast.error(`${action} failed , Please try again.`)
    };
     return navigate(`/post/${post.$id}`);
   }

    const newPost = await createPost({
        ...values,
        userId:user.id
    })
     if (!newPost) {
      toast.error('posting failed. Please try again.')
    }else{
        toast.success('Post Created Succesfully')
        console.log('post created')
    }
    navigate("/");
   
  }
   
  

  return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 custom-scrollbar "
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add Photos</FormLabel>
              <FormControl>
              <FileUploader
                   fieldChange={field.onChange}
                   mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Add location</FormLabel>
              <FormControl>
                <Input type="text" className=" h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3" {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white"> Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input type="text"
                 placeholder="Art, Expression, Learn"
                className=" h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3" {...field} />
              </FormControl>
              <FormMessage  className="text-red"/>
            </FormItem>
          )}
        />
       <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="h-12 bg-dark-4 px-5 text-light-1 flex gap-2"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className=" bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-2  whitespace-nowrap"
            disabled={isLoadingCreate}>
            {(isLoadingCreate||isLoadingUpdate)  && <Loader />}
             Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm