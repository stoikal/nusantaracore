import os

config = {
    "SUPABASE_URL": os.environ.get("SUPABASE_URL"),
    "SUPABASE_KEY": os.environ.get("SUPABASE_KEY"),
    "DOCUMENT_TITLE": "Nusantaracore",
    "MD_OUTPUT_PATH": "README.md",
    "PUBLIC_DIR": "public"
}
