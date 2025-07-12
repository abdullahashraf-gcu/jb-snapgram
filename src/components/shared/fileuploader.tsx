import { useCallback, useState } from "react";
import {  useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";
import addPhoto from "../../assets/icons/file-upload.svg"

import { Button } from "../ui/button";
import { convertFileToUrl } from "@/lib/utils";

type fileUploaderProps ={
    fieldChange : (file:File[])=> void;
    mediaUrl:string;
}
const FileUploader = ({fieldChange,mediaUrl}:fileUploaderProps) => {
    const[file,setFile]=useState<File[]>([]);
    const[fileUrl,setFileUrl]=useState<string>(mediaUrl);
   console.log(fileUrl)
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
     className="flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer"
     >
     <input {...getInputProps()} className="cursor-pointer" />   
        {
            fileUrl?( <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>):
            (
            <div className="file_uploader-box">
                <img
                src={addPhoto}
                width={96}
                height={77}
                alt="file upload"
            />

            <h3 className="base-medium text-light-2 mb-2 mt-6">
                Drag photo here
            </h3>
            <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

            <Button type="button" className="h-12 bg-dark-4 px-5 text-light-1 flex gap-2">
                Select from computer
            </Button>
            </div>
            )
        }
    </div>
  )
}

export default FileUploader