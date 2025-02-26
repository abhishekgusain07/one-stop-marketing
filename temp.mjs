import { exec } from "child_process";
import path from 'path';
import fs from 'fs';

/**
 * Adds text overlay to a video at a specific position and adds audio
 * @param {string} inputVideoPath - Path to the input video file
 * @param {string} outputVideoPath - Path where the output video will be saved
 * @param {string} text - Text to overlay on the video
 * @param {number} x - X position of the text (pixels from left)
 * @param {number} y - Y position of the text (pixels from top)
 * @param {number} fontSize - Font size of the text
 * @param {string} fontColor - Color of the text (e.g., 'white', '#FFFFFF')
 * @param {string} fontFile - (Optional) Path to custom font file
 * @param {string} audioFile - (Optional) Path to audio file to overlay
 */
function addTextToVideo(
  inputVideoPath,
  outputVideoPath,
  text,
  x,
  y,
  fontSize = 50,
  fontColor = 'white',
  fontFile = null,
  audioFile = null
) {
  // Escape single quotes in the text to prevent command injection
  const escapedText = text.replace(/'/g, "'\\''");
  
  // Build the FFmpeg command
  let fontConfig = '';
  if (fontFile && fs.existsSync(fontFile)) {
    fontConfig = `:fontfile='${fontFile}'`;
  }
  
  // Start building the command
  let command = `ffmpeg -i "${inputVideoPath}"`;
  
  // If an audio file is provided, include it in the command
  if (audioFile && fs.existsSync(audioFile)) {
    command += ` -i "${audioFile}" -filter_complex "[0:v][1:a]concat=n=1:v=1:a=1[v][a];[v]drawtext=text='${escapedText}':x=${x}:y=${y}:fontsize=${fontSize}:fontcolor=${fontColor}${fontConfig}" -map "[v]" -map "[a]"`;
  } else {
    command += ` -vf "drawtext=text='${escapedText}':x=${x}:y=${y}:fontsize=${fontSize}:fontcolor=${fontColor}${fontConfig}"`;
  }
  
  command += ` -codec:a copy "${outputVideoPath}"`;
  
  // Execute the command
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${command}`);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.log(`FFmpeg stderr: ${stderr}`);
      }
      console.log(`Video processed successfully: ${outputVideoPath}`);
      resolve(outputVideoPath);
    });
  });
}

// Example usage
async function main() {
  try {
    const result = await addTextToVideo(
      './input-video.mp4',
      './output-video.mp4',
      'this is social media campaign app, designed to run your full social media campaign',
      50,   // X position (50 pixels from left)
      100,  // Y position (100 pixels from top)
      36,   // Font size
      'white',  // Font color
      null,  // Font file (optional)
      './background-music.mp3' // Path to audio file
    );
    console.log(`Success! Output saved to: ${result}`);
  } catch (error) {
    console.error('Failed to process video:', error);
  }
}

main();