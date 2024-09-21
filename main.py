import dotenv
dotenv.load_dotenv()

import sys
sys.path.append('./lib/')

from get_data import get_data

get_data()
