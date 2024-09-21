import dotenv
dotenv.load_dotenv()

import sys
sys.path.append('./lib/')

from get_data import get_data
from generate_md import generate_md
from generate_html import generate_html

data = get_data()
generate_md(data)
generate_html(data)
