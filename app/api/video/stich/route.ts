
import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";

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

    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error("Error in video stitch:", error);
    return NextResponse.json(
      { 
        error: error.response?.data?.detail || "Failed to process video" 
      },
      { 
        status: error.response?.status || 500 
      }
    );
  }
}