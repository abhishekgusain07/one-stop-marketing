import { NextResponse } from "next/server";
import axios from "axios";

import { StichResponse } from "@/utils/backend/types";
import { db } from "@/db/drizzle";
import { products, users } from "@/db/schema";
import { NewProduct, Product, User, userCreateProps } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { uid } from "uid";
import { eq } from "drizzle-orm"
import { addNewVideo } from "@/utils/data/user/videos/addNewVideo";


export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { textPosition, hookText, selectedAvatar, video_urls, output_name, transition_type } = body;

    console.log("Making request to backend with:", {
      video_urls,
      output_name,
      transition_type,
      user_id: userId,
      text_position: textPosition,
      hook_text: hookText,
      selected_avatar: selectedAvatar
    });

    // Make request to FastAPI backend
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stitch`, {
      video_urls,
      output_name,
      transition_type,
      user_id: userId,
      text_position: textPosition,
      hook_text: hookText,
      selected_avatar: selectedAvatar
    });
    
    console.log("Backend response:", response.data);
    
    // Check if we have a successful response with output_url
    if (response.data && response.data.status === 'success' && response.data.output_url) {
      try {
        // Add the video to the database
        const newVideo = await addNewVideo({
          url: response.data.output_url, 
          hookText: hookText || null, 
          productId: null
        });
        
        console.log("Video added to database:", newVideo);
        
        // Return success response
        return NextResponse.json({
          status: 'success',
          output_url: response.data.output_url
        });
      } catch (dbError) {
        console.error("Error adding video to database:", dbError);
        // Even if database insertion fails, return success to frontend
        // since the video was created successfully
        return NextResponse.json({
          status: 'success',
          output_url: response.data.output_url,
          warning: "Video created but not saved to database"
        });
      }
    } else {
      // If backend response is not as expected
      console.error("Unexpected backend response format:", response.data);
      return NextResponse.json(
        { 
          error: "Unexpected response from backend",
          status: "error"
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in video stitch:", error);
    return NextResponse.json(
      { 
        error: error.response?.data?.detail || "Failed to process video",
        status: "error"
      },
      { 
        status: error.response?.status || 500 
      }
    );
  }
}