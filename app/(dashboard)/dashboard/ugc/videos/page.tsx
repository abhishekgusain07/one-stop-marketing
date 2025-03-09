"use client"

import React, { useEffect, useState } from 'react'
import { Videos } from '@/utils/types'
import { Loader2, Video, Plus, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import Link from 'next/link'
import { getUserVideos } from '@/utils/data/user/videos/getUserVideos'

function VideosPage() {
  const [videos, setVideos] = useState<Videos[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const fetchedVideos = await getUserVideos()
        setVideos(fetchedVideos)
      } catch (error) {
        console.error("Failed to fetch videos:", error)
        toast.error("Failed to load videos")
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [refreshTrigger])

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Videos</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            className="rounded-full"
          >
            <RefreshCw className="size-4" />
          </Button>
          <Link href="/dashboard/ugc/create">
            <Button className="flex items-center gap-2">
              <Plus className="size-4" />
              Create Video
            </Button>
          </Link>
        </div>
      </div>

      {(!videos || videos.length === 0) ? (
        <Card className="p-8 text-center bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <Video className="size-16 text-slate-400" />
            <h2 className="text-xl font-semibold text-slate-700">No Videos Yet</h2>
            <p className="text-slate-600">
              Create your first UGC video to showcase your products. Add text overlays and choose from our library of AI avatars.
            </p>
            <Link href="/dashboard/ugc/create">
              <Button className="mt-4 flex items-center gap-2">
                <Plus className="size-4" />
                Create Your First Video
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative bg-slate-100">
                <video 
                  src={video.url} 
                  className="w-full h-full object-cover"
                  controls
                  poster={`https://image.mux.com/${video.id}/thumbnail.jpg?time=0`}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {`Video ${video.id.substring(0, 8)}`}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {video.createdTime ? new Date(video.createdTime).toLocaleDateString() : ''}
                  </span>
                </div>
                {video.hookText && (
                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                    "{video.hookText}"
                  </p>
                )}
                <div className="mt-auto pt-4 flex justify-between items-center">
                  {video.productId ? (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Product linked
                    </span>
                  ) : (
                    <span className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded-full">
                      No product
                    </span>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Share
                    </Button>
                    <Button variant="default" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default VideosPage