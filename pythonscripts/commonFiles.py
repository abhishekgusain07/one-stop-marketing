import os

def get_existing_numbers(directory, extension):
    """Get set of numbers from files with a given extension in a directory"""
    return {
        int(os.path.splitext(filename)[0])
        for filename in os.listdir(directory)
        if filename.endswith(extension) and filename[:-len(extension)].isdigit()
    }

def find_common_numbers():
    """Find numbers that exist in both ugc/videos and ugc/images"""
    video_dir = "public/ugc/videos"
    image_dir = "public/ugc/images"
    
    video_numbers = get_existing_numbers(video_dir, ".mp4")
    image_numbers = get_existing_numbers(image_dir, ".png")
    
    common_numbers = video_numbers & image_numbers
    
    print("Common file numbers:", sorted(common_numbers))
    return common_numbers

def main():
    common_numbers = find_common_numbers()
    print(f"\nTotal common files: {len(common_numbers)}")

if __name__ == "__main__":
    main()
