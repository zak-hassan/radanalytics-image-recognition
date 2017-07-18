from __future__ import print_function
import os
from flask import Flask


app = Flask(__name__)

@app.route("/")
def home():
    return "Done!"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8081))
    app.run(host='0.0.0.0', port=port)
