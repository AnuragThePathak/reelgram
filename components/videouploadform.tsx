"use client"
import { useState } from "react"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { FILE_TYPES } from "@/constants"
import { createVideo } from "@/actions/video"
import { useForm } from "react-hook-form"
import FileUploader from "@/components/fileuploader"
import { INewVideo } from "@/lib/types"
import { useRouter } from "next/navigation"

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<INewVideo>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  })
  
  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath)
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath)
    toast.success("Video uploaded successfully!")
  }
  
  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress)
  }
  
  const onSubmit = async (data: INewVideo) => {
    if (!data.videoUrl) {
      toast.error("Please upload a video file")
      return
    }
    
    setLoading(true)
    const res = await createVideo({
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
    })
    
    if (res?.error) {
      toast.error(res.error)
      setLoading(false)
      return
    }
    
    toast.success("Video published successfully!")
    // Reset form after successful submission
    setValue("title", "")
    setValue("description", "")
    setValue("videoUrl", "")
    setValue("thumbnailUrl", "")
    setUploadProgress(0)
    setLoading(false)
    router.push(`/videos/${res._id}`)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-error text-sm">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className={`textarea textarea-bordered w-full h-24 ${errors.description ? "textarea-error" : ""}`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-error text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Upload Video</label>
        <FileUploader
          fileType={FILE_TYPES.VIDEO}
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block mt-6"
        disabled={loading || !uploadProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  )
}