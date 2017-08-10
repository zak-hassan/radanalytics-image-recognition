from flask import jsonify, request, Response, Blueprint, render_template, send_file
from flask import current_app as app
import os.path
import os
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
@basepage.route("/config")
@basepage.route("/stats")
def home():
    return render_template('index.html')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in \
           app.config['ALLOWED_EXTENSIONS']


@basepage.route("/api/v1/stats", methods=['POST'])
def store_stats():
    mock_data = {}
    file = request.files['file']
    # Option takes the form of an int in [1, 2, 3]
    # Where {1: "First Choice", 2: "Top 5", 3: "None of the above"}
    option = int(request.form['option'])

    return Response(json.dumps(mock_data), status=200,
                    mimetype="application/json")


@basepage.route("/api/v1/settings", methods=['POST','GET'])
def set_settings():
    if request.method == 'GET':
        mock_data = {
            "config": {
                "training_model_uri": {
                    'data': app.config['TRAINED_MODEL_URL'],
                    'description': "A link to the Pre-trained inception model."},
                "upload_folder": {
                    'data': app.config['UPLOAD_FOLDER'],
                    'description': "A (relative) path to where the server "
                                   "uploads the images."},
                "allowed_Extensions": {
                    'data': 'jpeg,jpg',
                    'description': "A list of comma-separated file extensions "
                                   "that the model will accept."},
                "model_folder_name": {
                    'data': '.model',
                    'description': "The name of the folder that stores "
                                   "the pre-trained model."},
                "model_folder_location": {
                    'data': "old/path/to/model/folder/location",
                    'description': "A link to the Pre-trained inception model."},
                "image_folder": {
                    'data': '.img_folder',
                    'description': 'The name of the folder that stores uploaded'
                                   'images.'}
            }
        }

        return Response(json.dumps(mock_data), status=200, mimetype="application/json")
    else:  # POST
        mock_data = {
            "config_change": [
                {
                    "field": "training_model_uri",
                    "new_value": "http://new/uri/to/trained_model/uri",
                    "status": "changed"
                },
                {
                    "field": "upload_folder",
                    "new_value": "new/path/to/upload/folder",
                    "status": "changed"
                },
                {
                    "field": "allowed_Extensions",
                    "new_value": "jpeg,jpg,png",
                    "status": "changed"
                },
                {
                    "field": "model_folder_name",
                    "new_value": ".new_model_folder_name",
                    "status": "changed"
                },
                {
                    "field": "model_folder_location",
                    "new_value": "new/path/to/model/folder",
                    "status": "changed"
                },
                {
                    "field": "image_folder",
                    "new_value": "new/path/to/image/folder",
                    "status": "changed"
                },
            ]}

        return Response(json.dumps(mock_data), status=200, mimetype="application/json")


@basepage.route("/api/v1/images", methods=['POST','GET'])
def get_images():
    return Response(
        json.dumps(os.listdir(app.config['UPLOAD_FOLDER'])),
        status=200, mimetype="application/json")

@basepage.route("/api/v1/historyServer", methods=['GET'])
def get_history():
    mock_data={
	"last_transaction": "july-27-4:00pm",
	"time_taken": "2.5s",
	"num_pages": 2,
	"num_results": 12,
	"results": [{
			"filename": "tiger.jpeg",
			"classification": "tiger",
			"percentage": 84.1865
		},
		{
			"filename": "weasel.jpeg",
			"classification": "weasel",
			"percentage": 58.4949
		}]
    }
    return Response(json.dumps(mock_data), status=200, mimetype="application/json")



@basepage.route("/api/v1/images/<image_name>")
def serve_image(image_name):
    path= app.config['UPLOAD_FOLDER'] + "/"+ image_name;
    return send_file( path, mimetype='image/jpeg' )

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
