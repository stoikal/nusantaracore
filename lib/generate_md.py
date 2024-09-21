import sys
sys.path.append('../')
from config import config

def generate_md(data):
    """Writes the specified content to a file.

    Args:
        data

    Raises:
        PermissionError: If permission is denied to write to the file.
    """

    file_path = config["MD_OUTPUT_PATH"]
    groups = data
    try:
        with open(file_path, 'w') as f:
            f.write(f"# {config['DOCUMENT_TITLE']}\n\n")
            
            for group in groups:
                f.write(f"## {group['title']}\n")
                
                for album in group['albums']:
                    entry = "* "
                    
                    if (album['is_highlighted']): entry += "**"
                    
                    entry += album['title']
                    entry += " "
                    
                    artists = album['artists']
                    for index, artist in enumerate(artists):
                        if (index == 0): entry += "- "
                        entry += artist['name']
                        if (index < len(artists) - 1): entry += ", "
                    
                    if (album["year"]): entry += f" ({album['year']})"
                    
                    if (album['is_highlighted']): entry += "**"
                    entry += " "
                    
                    if (album["youtube"]): entry += f"[youtube]({album['youtube']}) "
                    if (album["spotify"]): entry += f"[spotify]({album['spotify']}) "
                    if (album["yes_no_wave"]): entry += f"[yes_no_wave]({album['yes_no_wave']}) "
                    
                    f.write(f"{entry}\n")
                
                f.write("\n")

            colophone = "&nbsp;\n&nbsp;\n&nbsp;\n"
            colophone += "### Curated by\n"
            colophone += "Twitter: @fthrrhmn31  \n"
            colophone += "Spotify: Aditya Fathurrahman \n"
            
            f.write(colophone)
            
        print(f"Content written successfully to: {file_path}")
    except PermissionError:
        print(f"Permission denied: {file_path}")

