from __future__ import print_function
import os
from flask import Flask, render_template

templateDirectory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app/backend/templates')
staticDirectory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app/backend/static')

app = Flask(
        __name__,
        template_folder = templateDirectory,
        static_folder = staticDirectory
)

@app.route("/")
def home():
    return render_template('index.html')


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8081))
    app.run(host='0.0.0.0', port=port)
