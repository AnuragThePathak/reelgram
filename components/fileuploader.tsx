"use client"
import React, { useState } from "react"
import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { FILE_TYPES } from "@/constants"
import { Loader2 } from "lucide-react"

interface FileUploaderProps {
	onSuccess: (res: IKUploadResponse) => void
	onProgress?: (progress: number) => void
	fileType?: FILE_TYPES.IMAGE | FILE_TYPES.VIDEO
}

export default function FileUploader({
	onSuccess, onProgress, fileType = FILE_TYPES.IMAGE
}: FileUploaderProps) {
	const [uploading, setUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleError = (err: { message: string }) => {
		setError(err.message)
		setUploading(false)
	}

	const handleSuccess = (res: IKUploadResponse) => {
		setUploading(false)
		setError(null)
		onSuccess(res)
	}

	const handleUploadProgress = (progress: ProgressEvent) => {
		if (progress.lengthComputable && onProgress) {
			const percentageCompleted = (progress.loaded / progress.total) * 100
			onProgress(Math.round(percentageCompleted))
		}
	}

	const handleUploadStart = () => {
		setUploading(true)
		setError(null)
	}

	const validateFile = (file: File) => {
		if (fileType === FILE_TYPES.VIDEO) {
			if (!file.type.startsWith("video/")) {
				setError("Please upload a valid video file.")
				return false
			}

			if (file.size > 100000000) {
				setError("File size exceeds the limit of 100MB.")
				return false
			}
		} else if (fileType === FILE_TYPES.IMAGE) {
			const fileExtensions = ["image/jpeg", "image/png", "image/gif"]
			if (!fileExtensions.includes(file.type)) {
				setError("Please upload a valid image file.")
				return false
			}

			if (file.size > 5000000) {
				setError("File size exceeds the limit of 5MB.")
				return false
			}
		}

		return true
	}

	return (
		<div className="space-y-2">
			<IKUpload
				fileName={fileType === FILE_TYPES.VIDEO ? "video" : "image"}
				useUniqueFileName={true}
				validateFile={validateFile}
				folder={fileType === FILE_TYPES.VIDEO ? "/videos" : "/images"}
				onError={handleError}
				onSuccess={handleSuccess}
				onUploadProgress={handleUploadProgress}
				onUploadStart={handleUploadStart}
				className="file-input file-input-bordered w-full"
			/>

			{uploading && (
				<div className="flex items-center gap-2 text-sm text-primary">
					<Loader2 className="animate-spin w-4 h-4" />
					<span>Uploading...</span>
				</div>
			)}

			{error && (
				<div className="text-sm text-error">{error}</div>)}
		</div>
	)
}