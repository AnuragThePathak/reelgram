"use client"

import { apiClient } from "@/lib/api-client"
import { IVideo } from "@/lib/types"
import { IKVideo } from "imagekitio-next"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Page() {
	const { id } = useParams<{ id: string }>()
	const [video, setVideo] = useState<IVideo | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!id) return

		const fetchVideo = async () => {
			try {
				setLoading(true)
				const fetchedVideo = await apiClient.getVideo(id)
				setVideo(fetchedVideo)
			} catch (error) {
				toast.error(error instanceof Error ? error.message : "Could not fetch video")
				setVideo(null)
			} finally {
				setLoading(false)
			}
		}

		fetchVideo()
	}, [id])

	if (loading) return (<div className="flex items-center justify-center fixed inset-0 z-50">
		<div className="flex items-center gap-2 text-sm text-primary bg-white/80 p-3 rounded-md shadow-sm">
			<Loader2 className="animate-spin w-4 h-4" />
			<span>Loading...</span>
		</div>
	</div>)

	if (!video) return (<div className="flex items-center justify-center fixed inset-0 z-50">
		<div className="col-span-full text-center py-12">
			<p className="text-base-content/70">No videos found</p>
		</div>
	</div>)
	
	return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <div className="max-w-md mx-auto">
        <div className="bg-base-100 shadow rounded-xl overflow-hidden">
          <div 
            className="relative" 
            style={{ aspectRatio: "9/16", maxHeight: "calc(85vh - 120px)" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={true}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <p className="text-base-content/70">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
