import requests
import os
from concurrent.futures import ThreadPoolExecutor
from tqdm import tqdm

def ensure_directory_exists(directory):
    """Create directory if it doesn't exist"""
    if not os.path.exists(directory):
        os.makedirs(directory)

def download_video(url, output_path):
    """Download video from URL and save to output path"""
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            # Get total file size for progress bar
            total_size = int(response.headers.get('content-length', 0))
            
            # Open file and write chunks with progress bar
            with open(output_path, 'wb') as file, tqdm(
                desc=os.path.basename(output_path),
                total=total_size,
                unit='iB',
                unit_scale=True,
                unit_divisor=1024,
            ) as progress_bar:
                for data in response.iter_content(chunk_size=1024):
                    size = file.write(data)
                    progress_bar.update(size)
            return True
        return False
    except Exception as e:
        print(f"Error downloading {url}: {str(e)}")
        return False

def check_and_download_video(index):
    """Check if video exists and download if it does"""
    base_url = "https://d3cqxidtqh4nzy.cloudfront.net"
    output_dir = "public/ugc/videos"
    
    # Ensure the output directory exists
    ensure_directory_exists(output_dir)
    
    # Construct URL and output path
    url = f"{base_url}/{index}.mp4"
    output_path = os.path.join(output_dir, f"{index}.mp4")
    
    try:
        # First check if the video exists
        response = requests.head(url)
        if response.status_code == 200:
            print(f"\nFound video {index}.mp4, downloading...")
            if download_video(url, output_path):
                print(f"Successfully downloaded {index}.mp4")
                return True
        else:
            print(f"Video {index}.mp4 does not exist (Status code: {response.status_code})")
            return False
    except Exception as e:
        print(f"Error checking {url}: {str(e)}")
        return False

def main():
    print("Starting video download script...")
    
    # Create a thread pool to download multiple videos concurrently
    with ThreadPoolExecutor(max_workers=5) as executor:
        # Create a list of futures for all video indices
        futures = [executor.submit(check_and_download_video, i) for i in range(1, 81)]
        
        # Count successful downloads
        successful_downloads = sum(1 for future in futures if future.result())
    
    print(f"\nDownload complete! Successfully downloaded {successful_downloads} videos.")

if __name__ == "__main__":
    main()
