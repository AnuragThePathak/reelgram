"use client";

import React, { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client"
import VideoFeed from "@/components/videofeed"
import toast from "react-hot-toast"
import { IVideo } from "@/lib/types"

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to fetch videos");
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reelgram</h1>
      <VideoFeed videos={videos} />
    </main>
  );
}