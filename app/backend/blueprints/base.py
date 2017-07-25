from flask import jsonify, request, Response, Blueprint, render_template
from flask import current_app as app
import os.path
from werkzeug.utils import secure_filename
import json

try:
    # Python2
    from StringIO import StringIO
except ImportError:
    from io import StringIO


basepage = Blueprint('base_page', __name__, template_folder='templates')


@basepage.route("/")
def home():
    return render_template('index.html')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in \
           app.config['ALLOWED_EXTENSIONS']


@basepage.route("/api/v1/imgrecognize", methods=['POST', 'GET'])
def img_recognize():

    file = request.files['file']

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Send mock data
    mock_data = {'pred': [(89.11, 'giant panda'),
                          (0.78, 'indri'),
                          (0.30, 'lesser panda'),
                          (0.15, 'custard apple'),
                          (0.12, 'earthstar')]}

    return Response(
        json.dumps(mock_data),
        status=200, mimetype="application/json")
