from __future__ import print_function
from flask import Flask
from werkzeug.utils import find_modules, import_string
from os.path import join, abspath, dirname
from os import environ

# Can change to parameter/args
UPLOAD_FOLDER = '.rad-img-recog'
DEFAULT_IMAGE_NAME = 'placeholder.jpg'
ALLOWED_EXTENSIONS = ['jpeg', 'jpg']


def create_app(config=None):
    working_dir = dirname(abspath(__file__))

    template_directory = join(working_dir, 'app', 'backend', 'templates')
    static_directory = join(working_dir, 'app', 'backend', 'static')

    flask_app = Flask(
        __name__,
        template_folder=template_directory,
        static_folder=static_directory
    )

    register_blueprints(flask_app)

    flask_app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    flask_app.config['IMAGE_FILE'] = DEFAULT_IMAGE_NAME
    flask_app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS

    return flask_app


def register_blueprints(flask_app):
    """Register all blueprint modules"""
    for name in find_modules('app.backend.blueprints'):
        mod = import_string(name)
        if hasattr(mod, 'basepage'):
            flask_app.register_blueprint(mod.basepage)
    return None


if __name__ == "__main__":
    app = create_app()
    port = int(environ.get("PORT", 8081))
    app.run(host='localhost', port=port)
