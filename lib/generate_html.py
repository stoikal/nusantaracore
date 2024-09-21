from jinja2 import Environment, FileSystemLoader
from config import config

loader = FileSystemLoader('./template')
environment = Environment(loader=loader, trim_blocks=True)

template = environment.get_template('index.html.jinja')

def generate_html(data):
    context = {
        "title": config["DOCUMENT_TITLE"],
        "groups": data
    }

    # print(template.render(context))
    with open(config["PUBLIC_DIR"] + "/" + "index.html", 'w') as f:
        f.write(template.render(context))
