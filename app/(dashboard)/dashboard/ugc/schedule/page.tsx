'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Instagram, Twitter, Video, Loader2Icon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Videos } from '@/utils/types';
import { getUserVideos } from '@/utils/data/user/videos/getUserVideos';

// Define the schema for scheduling a post
const scheduleFormSchema = z.object({
  videoId: z.string().min(1, "Please select a video"),
  platform: z.enum(["instagram", "tiktok", "twitter"]),
  time: z.string().min(1, "Please select a time"),
  date: z.string(),
});

type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

const ContentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Get the number of days in the month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get the number of days in the previous month
  const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
  
  // Get today's date for highlighting current day
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const todayDate = today.getDate();
  
  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Function to go to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // Function to go to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Generate calendar days array
  const generateCalendarDays = () => {
    const calendarDays = [];
    
    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPreviousMonth - i,
        isCurrentMonth: false,
        isPreviousMonth: true
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isToday: isCurrentMonth && i === todayDate
      });
    }
    
    // Next month days
    const totalDaysShown = 42; // 6 rows of 7 days
    const nextMonthDays = totalDaysShown - calendarDays.length;
    
    for (let i = 1; i <= nextMonthDays; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }
    
    return calendarDays;
  };
  
  const calendarDays = generateCalendarDays();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [fetchingUserVideos, setFetchingUserVideos] = useState<boolean>(false);
  const [availableVideos, setAvailableVideos] = useState<Videos[]>([]);

  useEffect(() => {
    const fetchUserVideos = async() => {
      try{
        setFetchingUserVideos(true)
        const videos: Videos[] = await getUserVideos();
        setAvailableVideos(videos);
      }catch(error) {
        console.log(error)
      }finally{
        setFetchingUserVideos(false)
      }
    }
    fetchUserVideos()
  },[])
  const scheduleForm = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      videoId: "",
      platform: "instagram",
      time: "",
      date: "",
    },
  });

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(clickedDate);
    setShowScheduleDialog(true);
    
    // Pre-fill the date in the form
    const formattedDate = clickedDate.toISOString().split('T')[0];
    scheduleForm.setValue('date', formattedDate);
  };

  const onScheduleSubmit = async (data: ScheduleFormValues) => {
    try {
      // Add your API call here to save the scheduled post
      console.log('Scheduling post:', data);
      toast.success('Post scheduled successfully!');
      setShowScheduleDialog(false);
      scheduleForm.reset();
    } catch (error) {
      toast.error('Failed to schedule post');
      console.error(error);
    }
  };
  if(fetchingUserVideos) {
    return <div className='w-full h-screen flex items-center justify-center'>
      <Loader2Icon className='size-4 animate-spin' />
    </div>
  }
  return (
    <div className="w-full rounded-lg p-8 md:p-16">
      <div className="flex mb-4">
        <h1 className="text-3xl font-bold text-[#333]">Content Calendar</h1>
        <div className="flex-1 flex items-end justify-end">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={goToPreviousMonth}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md text-xs h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={goToNextMonth}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md text-xs h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <span className="text-lg font-medium">{monthNames[currentMonth]} {currentYear}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 pt-4 pb-8">
        {dayNames.map((day, index) => (
          <div key={index} className="text-sm text-[#555]">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 relative">
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`
              aspect-square p-2 border border-[#B8B8B845] relative 
              ${day.isCurrentMonth ? 'bg-[#F7F8F3]' : 'bg-[#EEEFE8]'}
              ${day.isCurrentMonth ? 'cursor-pointer' : 'cursor-not-allowed'}
              group
            `}
            onClick={() => day.isCurrentMonth && handleDayClick(day.day, day.isCurrentMonth)}
            onMouseEnter={() => day.isCurrentMonth && setHoveredDay(day.day)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            <div 
              className={`
                w-6 h-6 flex items-center justify-center mb-2
                ${day.isToday ? 'bg-blue-500 text-white rounded-full p-4' : ''}
                ${day.isCurrentMonth ? 'text-[#333]' : 'text-[#B8B8B8]'}
              `}
            >
              {day.day}
            </div>
            
            {/* Add Post Button - Shows on hover */}
            {day.isCurrentMonth && hoveredDay === day.day && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Button
                  size="sm"
                  className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDayClick(day.day, day.isCurrentMonth);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Schedule Post for {selectedDate?.toLocaleDateString()}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...scheduleForm}>
            <form onSubmit={scheduleForm.handleSubmit(onScheduleSubmit)} className="space-y-6">
              <FormField
                control={scheduleForm.control}
                name="videoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Video</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a video" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableVideos.map((video) => (
                          <SelectItem key={video.id} value={video.id}>
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4" />
                              {video.hookText}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={scheduleForm.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="instagram">
                          <div className="flex items-center gap-2">
                            <Instagram className="h-4 w-4" />
                            Instagram
                          </div>
                        </SelectItem>
                        <SelectItem value="tiktok">
                          <div className="flex items-center gap-2">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                            </svg>
                            TikTok
                          </div>
                        </SelectItem>
                        <SelectItem value="twitter">
                          <div className="flex items-center gap-2">
                            <Twitter className="h-4 w-4" />
                            X (Twitter)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={scheduleForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduleDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Schedule Post
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentCalendar;