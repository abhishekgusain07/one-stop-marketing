import requests
import os
from concurrent.futures import ThreadPoolExecutor
from tqdm import tqdm

def ensure_directory_exists(directory):
    """Create directory if it doesn't exist"""
    if not os.path.exists(directory):
        os.makedirs(directory)

def download_image(url, output_path):
    """Download image from URL and save to output path"""
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(output_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=1024):
                    file.write(chunk)
            return True
        return False
    except Exception as e:
        print(f"Error downloading {url}: {str(e)}")
        return False

def check_and_download_image(index):
    """Check if image exists and download if it does"""
    base_url = "https://d3cqxidtqh4nzy.cloudfront.net"
    output_dir = "public/ugc/images"
    
    # Ensure the output directory exists
    ensure_directory_exists(output_dir)
    
    # Construct URL and output path
    url = f"{base_url}/{index}.png"
    output_path = os.path.join(output_dir, f"{index}.png")
    
    try:
        # First check if the image exists
        response = requests.head(url)
        if response.status_code == 200:
            print(f"\nFound image {index}.png, downloading...")
            if download_image(url, output_path):
                print(f"Successfully downloaded {index}.png")
                return True
        else:
            print(f"Image {index}.png does not exist (Status code: {response.status_code})")
            return False
    except Exception as e:
        print(f"Error checking {url}: {str(e)}")
        return False

def main():
    print("Starting image download script...")
    
    # Create a thread pool to download multiple images concurrently
    with ThreadPoolExecutor(max_workers=5) as executor:
        # Create a list of futures for all image indices
        futures = [executor.submit(check_and_download_image, i) for i in range(82, 100)]
        
        # Count successful downloads
        successful_downloads = sum(1 for future in futures if future.result())
    
    print(f"\nDownload complete! Successfully downloaded {successful_downloads} images.")

if __name__ == "__main__":
    main()
