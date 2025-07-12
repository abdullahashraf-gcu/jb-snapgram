import { useCallback, useState } from "react";
import {  useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";
import placeImg from "../../assets/icons/profile-placeholder.svg"

type fileUploaderProps ={
    fieldChange : (file:File[])=> void;
    mediaUrl:string;
}
const ProfileUploader = ({fieldChange,mediaUrl}:fileUploaderProps) => {

    const[file,setFile]=useState<File[]>([]);
    const[fileUrl,setFileUrl]=useState<string>(mediaUrl);
    

    const onDrop= useCallback(
        (acceptedFiles: FileWithPath[])=>{
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]));

    },[file])

    const {getRootProps,getInputProps}= useDropzone({
        onDrop,
        accept:{
             "image/*": [".png", ".jpeg", ".jpg"],
        }
    });
  return (
    <div {...getRootProps()}
     className=" cursor-pointer"
     >
     <input {...getInputProps()} className="cursor-pointer" />   
        {
            <div className="flex flex-1 w-full max-w-5xl">
                <div className="flex gap-3 items-center max-sm:flex-col max-sm:justify-center">
                    <img src={fileUrl|| placeImg}alt="" className="w-[100px] h-[100px] rounded-full" />
                    <p className="text-sm text-primary-500"> Change Your Profile Picture</p>
                </div>
            </div>
        }
    </div>
  )
}

export default ProfileUploader