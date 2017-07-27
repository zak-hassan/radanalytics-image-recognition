from flask import jsonify, request, Response, Blueprint, render_template
from flask import current_app as app
import os.path
from werkzeug.utils import secure_filename
import json
from app.backend.inception import inception
from infinispan.remotecache import RemoteCache
import datetime

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

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    file = request.files['file']

    # TODO :
    #if file and allowed_file(file.filename):

    filename = secure_filename(file.filename)
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(img_path)

    # Use Inception Model
    inception.data_dir = app.config['INCEPTION_MODEL']
    inception.maybe_download()
    model = inception.Inception()
    pred = model.classify(image_path=img_path)
    scores = model.get_scores(pred=pred, k=5)
    model.close()

    remote_cache = RemoteCache()
    time = datetime.datetime.now().strftime("%B-%d-%Y-%I:%M%p")
    key= filename + time
    remote_cache.put(key, json.dumps({'pred':scores, 'timestamp': time , 'filename': filename}) )
    print remote_cache.stats()
    print "Key: %s" % key
    # Send data
    resp = {'pred': scores}

    return Response(
        json.dumps(resp),
        status=200, mimetype="application/json")
