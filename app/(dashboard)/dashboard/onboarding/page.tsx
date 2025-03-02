import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video, Images, CircleUserRound, Sparkles, Plus, ArrowUpRight, Upload } from 'lucide-react';

const Onboarding = () => {
  return (
    <div className="p-4 md:p-8 md:pt-4 pt-4">
      <div className="min-h-screen bg-[#F3F4EF] p-2 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-4 md:mb-8 px-4">
            <Image src="/images/reelfarm_icon.png" alt="ReelFarm Icon" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 rounded-[16px]" />
            <h1 className="text-lg md:text-xl font-semibold text-center">Welcome to OneStopMarketing</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full px-4 md:px-0">
            <Link href="/dashboard/ugc/create">
              <div className="bg-white p-4 md:p-6 rounded-[16px] shadow-md cursor-pointer transition-all hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Video className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-sm md:text-md font-medium mt-auto pt-4 md:pt-16">Create UGC videos</h3>
                <p className="text-xs md:text-sm text-[#777] mt-1">Create &amp; publish UGC videos promoting your product demo</p>
              </div>
            </Link>
            
            <Link href="/dashboard/greenscreen">
              <div className="bg-white p-4 md:p-6 rounded-[16px] shadow-md cursor-pointer transition-all hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Images className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  </div>
                </div>
                <h3 className="text-sm md:text-md font-medium mt-auto pt-4 md:pt-16">Create Greenscreen Meme videos</h3>
                <p className="text-xs md:text-sm text-[#777] mt-1">Create relatable meme videos about your product / business</p>
              </div>
            </Link>
            
            <Link href="/dashboard/ugc-creator">
              <div className="bg-white p-4 md:p-6 rounded-[16px] shadow-md cursor-pointer transition-all hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-50 flex items-center justify-center">
                    <CircleUserRound className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                  </div>
                </div>
                <h3 className="text-sm md:text-md font-medium mt-auto pt-4 md:pt-16">UGC Avatar Generator</h3>
                <p className="text-xs md:text-sm text-[#777] mt-1">Create custom AI avatars for the UGC "hook + demo" video format</p>
              </div>
            </Link>
            
            <Link href="/dashboard/hooks">
              <div className="bg-white p-4 md:p-6 rounded-[16px] shadow-md cursor-pointer transition-all hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-sm md:text-md font-medium mt-auto pt-4 md:pt-16">Hook Generator</h3>
                <p className="text-xs md:text-sm text-[#777] mt-1">Auto-magically generate and save viral hooks for your videos</p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-8 md:mt-16 px-4 md:px-0">
          <div className="space-y-2">
            <div className="bg-white p-4 md:p-6 rounded-[16px] border border-[#EEE] flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Image src="/images/stripe.jpeg" alt="Stripe" width={32} height={32} className="w-6 h-6 md:w-8 md:h-8 rounded-[6px] object-contain" />
                <div>
                  <h3 className="text-sm md:text-base font-semibold">Subscription required</h3>
                  <p className="text-xs md:text-sm text-gray-500">Estimated 2-3 minutes</p>
                </div>
              </div>
              <button className="justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 bg-[#378EFF] text-white text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md hover:opacity-90 transition-opacity inline-flex items-center gap-1">
                Upgrade now <ArrowUpRight className="hidden md:inline" />
              </button>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[16px] border border-[#EEE] flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Image src="/images/tiktok.png" alt="TikTok" width={32} height={32} className="w-6 h-6 md:w-8 md:h-8 rounded-[6px] object-contain" />
                <div>
                  <h3 className="text-sm md:text-base font-semibold">Connect TikTok account</h3>
                  <p className="text-xs md:text-sm text-gray-500">Estimated 30 seconds</p>
                </div>
              </div>
              <button className="bg-[#378EFF] text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                <Plus /> Connect TikTok
              </button>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[16px] border border-[#EEE] flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <div>
                  <h3 className="text-sm md:text-base font-semibold">Add your first product</h3>
                  <p className="text-xs md:text-sm text-gray-500">Estimated 30 seconds</p>
                </div>
              </div>
              <button className="justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 bg-[#378EFF] text-white text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md hover:opacity-90 transition-opacity inline-flex items-center gap-1">
                <Plus /> Add Product
              </button>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[16px] border border-[#EEE] flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <div>
                  <h3 className="text-sm md:text-base font-semibold">Upload product demo video</h3>
                  <p className="text-xs md:text-sm text-gray-500">Estimated 30 seconds</p>
                </div>
              </div>
              <button className="justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-9 bg-[#378EFF] text-white text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md hover:opacity-90 transition-opacity inline-flex items-center gap-1">
                <Upload /> Upload Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;