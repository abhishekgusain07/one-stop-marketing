"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { commonFiles } from '@/constants/commonFiles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axios';
import { StichResponse } from '@/utils/backend/types';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type AvailableTextPosition = "top" | "middle" | "bottom"

const UGCAdCreator = () => {


  const [hookText, setHookText] = useState('edit ur text here');
  const [selectedAvatar, setSelectedAvatar] = useState(41); // Default selected avatar
  const [currentPage, setCurrentPage] = useState(1);
  const [processing, setProcessing] = useState<boolean>(false)
  const [textPosition, setTextPosition] = useState<AvailableTextPosition>("middle")

  const router = useRouter();


  // Calculate total pages based on avatars per page
  const itemsPerPage = 24; // Increased from 18 to 24 (8x3 grid)
  const totalPages = Math.ceil(commonFiles.length / itemsPerPage);
  
  const stichVideoWithText = async() => {
    try {
      setProcessing(true);
      
      //todo: add product Id field.
      const response = await axios.post('/api/video/stich', {
        textPosition,
        hookText,
        selectedAvatar,
        video_urls: [`/ugc/videos/${selectedAvatar}.mp4`],
        output_name: `output_${Date.now()}`,
        transition_type: "fade"
      });

      // Debug the response
      console.log("API Response:", response);

      // Check response.data.status instead of response.status
      if (response.data && response.data.status === 'success') {
        toast.success("Video created successfully!");
        
        // Add a small delay before redirecting
        setTimeout(() => {
          router.push("/dashboard/ugc/videos");
        }, 500);
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", response.data);
        toast.error("Unexpected response from server");
      }
      
    } catch (error: any) {
      console.error("Error creating video:", error);
      toast.error(error.response?.data?.detail || "Error while creating the video, try again later.");
    } finally {
      setProcessing(false);
    }
  };
  // Get current page avatars
  const getCurrentPageAvatars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return commonFiles.slice(startIndex, endIndex);
  };
  
  // Navigation handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="bg-[#F3F4EF]">
      <div className="p-8">
        <h2 className="text-[24px] font-bold text-[#333] tracking-[-0.5px] mb-4">Create UGC ads</h2>
        <div className="flex h-[calc(100vh-72px)] min-h-[600px] md:h-[calc(70vh)] max-h-[800px] gap-4 border border-[#B8B8B8] p-8 bg-[#e6e6e1] rounded-[16px]">
          <div className="w-[45%] flex flex-col gap-4 px-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-[14px] font-bold text-[#333] font-inter">1. Hook</h3>
                </div>
              </div>
              <div className="bg-white rounded-[24px] shadow p-6 flex items-center justify-center relative">
                <div className="absolute left-0 h-full w-[32px] flex items-center justify-center hover:bg-[#EEEEEE] cursor-pointer rounded-l-[24px] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left text-gray-500">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </div>
                <textarea 
                  className="text-center focus:outline-none resize-none overflow-hidden w-[70%]" 
                  rows={1}
                  style={{ height: 'auto', minHeight: '24px' }}
                  value={hookText}
                  onChange={(e) => setHookText(e.target.value)}
                />
                <div className="absolute right-0 h-full w-[32px] flex items-center justify-center hover:bg-[#EEEEEE] cursor-pointer rounded-r-[24px] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-gray-500">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[14px] font-bold text-[#333] font-inter">2. AI avatar</h3>
                <div className="flex text-xs font-semibold text-[#333]">
                  <a className="cursor-pointer opacity-100">Templates</a>
                  <a className="ml-2 cursor-pointer opacity-50">My UGC</a>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </button>
                  <span className="text-sm text-gray-500">{currentPage}/{totalPages}</span>
                  <button 
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-8 auto-rows-[48px] gap-2 h-[168px] w-full" style={{ gridTemplateColumns: 'repeat(8, minmax(48px, 48px))', gridTemplateRows: 'repeat(3, 48px)' }}>
                {getCurrentPageAvatars().map((fileId) => (
                  <div 
                    key={fileId} 
                    className={`w-12 h-12 bg-[#B8B8B8] rounded-lg cursor-pointer overflow-hidden relative ${selectedAvatar === fileId ? 'border-2 border-blue-500' : 'opacity-[50%]'}`}
                    onClick={() => setSelectedAvatar(fileId)}
                  >
                    <div className="flex items-center justify-center w-12 h-12 overflow-hidden">
                      <Image 
                        alt="Avatar preview" 
                        width={48} 
                        height={48} 
                        src={`/ugc/images/${fileId}.png`} 
                        className="object-cover" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[14px] font-bold text-[#333] mb-2 font-inter">3. Demos</h3>
              </div>
              <div className="grid grid-cols-8 gap-2 w-fit">
                <div className="w-12 aspect-[9/16] rounded-[8px] cursor-pointer overflow-hidden bg-[#DDDDD3] flex flex-col items-center justify-center gap-1 hover:bg-[#CECEC4] transition-colors border-2 border-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-[#767771]">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                  <span className="text-[#767771] text-[12px] font-medium">None</span>
                </div>
                <div className="w-12 aspect-[9/16] rounded-[8px] cursor-pointer bg-[#DDDDD3] flex items-center justify-center hover:opacity-35 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus text-[#767771]">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-[55%] flex flex-col" suppressHydrationWarning>
            <div className="relative rounded-2xl border border-[#DADBD2] overflow-hidden flex items-center justify-center flex-1">
              <div className="absolute inset-0 bg-[#B9B9B6]"></div>
              <div className="h-full w-auto aspect-[9/16] z-[1]" suppressHydrationWarning>
                <video 
                  src={`/ugc/videos/${selectedAvatar}.mp4`} 
                  className="w-full h-full object-cover transition-opacity duration-300 opacity-100" 
                  autoPlay={true}
                  loop={true}
                  playsInline={true}
                ></video>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className={cn("absolute w-full", textPosition === "top" ? "px-4 top-4 pt-16" : textPosition === "middle" ? "px-4 top-1/2 -translate-y-1/2" : "px-4 bottom-4 pb-16")}>
                    <div className="text-white font-semibold text-center break-words mx-auto" style={{ fontFamily: '"TikTok Display Medium"', textShadow: 'rgb(0, 0, 0) -1px -1px 0px, rgb(0, 0, 0) 1px -1px 0px, rgb(0, 0, 0) -1px 1px 0px, rgb(0, 0, 0) 1px 1px 0px', maxWidth: '250px', overflowWrap: 'break-word', fontSize: 'clamp(12px, 2.5vw, 16px)' }}>
                      {hookText}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 w-fit z-[10]">
                <button className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex-1", textPosition === "top" ? "bg-white" : "opacity-[50%]")}
                onClick={() => setTextPosition("top")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-vertical-justify-start w-4 h-4">
                    <rect width="14" height="6" x="5" y="16" rx="2"></rect>
                    <rect width="10" height="6" x="7" y="6" rx="2"></rect>
                    <path d="M2 2h20"></path>
                  </svg>
                </button>
                <button className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex-1", textPosition === "middle" ? "bg-white" : "opacity-[50%] bg-white")}
                onClick={() => setTextPosition("middle")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-vertical-space-around w-4 h-4">
                    <rect width="10" height="6" x="7" y="9" rx="2"></rect>
                    <path d="M22 20H2"></path>
                    <path d="M22 4H2"></path>
                  </svg>
                </button>
                <button className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex-1", textPosition === "bottom" ? "bg-white" : "opacity-[50%]")}
                onClick={() => setTextPosition("bottom")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-vertical-justify-end w-4 h-4">
                    <rect width="14" height="6" x="5" y="12" rx="2"></rect>
                    <rect width="10" height="6" x="7" y="2" rx="2"></rect>
                    <path d="M2 22h20"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-fit px-4 py-6 text-lg bg-white mt-4 rounded-xl" type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
                <div className="flex items-center gap-2">
                  <Image alt="Sound thumbnail" width={32} height={32} className="rounded-md mr-1" src="/images/sound.png" />
                  Sound
                </div>
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-primary hover:bg-primary/70 h-9 px-4 flex-1 py-6 text-lg mt-4 rounded-xl " onClick={stichVideoWithText} disabled={processing}>
                {!processing ? "Create" : <Loader2 className='size-4 animate-spin' />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-8">
          <h2 className="text-[24px] font-bold text-[#333] tracking-[-0.5px]">
            My Videos <a className="text-[24px] font-medium text-[#B8B8B8]">(0)</a>
          </h2>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md text-xs h-8 w-8 p-0" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left h-4 w-4">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <span className="text-sm text-gray-500">Page 1 of 0</span>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md text-xs h-8 w-8 p-0" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-6 lg:grid-cols-6 gap-2 mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative">
              <div className="relative bg-[#e6e6e0] rounded-[16px] overflow-hidden">
                <div className="relative w-full aspect-[9/16]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false"></section>
    </div>
  );
};

export default UGCAdCreator;