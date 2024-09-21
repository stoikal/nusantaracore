import sys
sys.path.append('../')
from config import config
from supabase import create_client, Client

supabase: Client = create_client(config["SUPABASE_URL"], config["SUPABASE_KEY"])

def get_data():
    response = supabase.table("groups").select("title, albums (title, year, is_highlighted, youtube, spotify, yes_no_wave, artists (name))").execute()
    print(response)
    return response
