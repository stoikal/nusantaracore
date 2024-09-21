import dotenv
dotenv.load_dotenv()

import sys
sys.path.append('./lib/')

from get_data import get_data
from generate_md import generate_md

data = get_data()
generate_md(data)
