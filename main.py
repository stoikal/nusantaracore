import shutil
import os

def copy_file(source_path, destination_path):
    try:
        shutil.copy(source_path, destination_path)
        print(f"File copied successfully: {source_path} -> {destination_path}")
    except shutil.SameFileError:
        print("Source and destination paths are the same.")
    except FileNotFoundError:
        print(f"Source file not found: {source_path}")
    except PermissionError:
        print(f"Permission denied: {source_path}")  



# Example usage:
source_file = "index.html"
source_dir = "./src"
destination_dir = "./dist"

copy_file(os.path.join(source_dir, source_file), destination_dir)