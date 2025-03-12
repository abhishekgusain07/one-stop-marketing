'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
            className={`aspect-square p-2 border border-[#B8B8B845] relative ${
              day.isCurrentMonth ? 'bg-[#F7F8F3]' : 'bg-[#EEEFE8]'
            }`}
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
            <div className="absolute top-12 left-0 right-0 max-h-[calc(100%-3rem)] overflow-y-auto">
              {/* Content for scheduled items would go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCalendar;