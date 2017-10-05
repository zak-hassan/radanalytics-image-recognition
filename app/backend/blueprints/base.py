from flask import jsonify, request, Response, Blueprint, render_template, send_file
from flask import current_app as app
import os.path
import os
from werkzeug.utils import secure_filename
import json
from app.backend.inception import inception
from infinispan.remotecache import RemoteCache
import datetime
from timeit import default_timer as timer
import glob

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
    print("Option received: " + option)
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
def get_jdg_history():
    hostname= os.getenv('JDG_HOSTNAME','0.0.0.0')
    basepath=os.getenv('BASE_PATH','/Users/zhassan/git/radanalytics-image-recognition/')
    remote_cache = RemoteCache(host=hostname)
    os.chdir(basepath)
    files=glob.glob(".rad-img-recog/*")
    mock_data={}
    mock_data["results"]=[]
    for f in files:
        name=remote_cache.get((f.split("/")[1]))
        data =json.loads(name)
        mock_data["results"].append({
            "filename": f.split("/")[1],
            "classification": data["pred"][0][1],
            "percentage":data["pred"][0][0]
        })
    mock_data['time_taken']=remote_cache.get("time_taken")
    mock_data['last_transaction']=remote_cache.get("last_transaction")
    if (len(files) <10):
        mock_data["num_results"]=len(files)
        mock_data["num_pages"]=1
    else:
        mock_data["num_results"]=len(files)
        total_files=len(files)
        num= total_files/10
        if( total_files %10 != 0):
            num= num+1
        mock_data["num_pages"]= num
    print (mock_data)
    return Response(json.dumps(mock_data), status=200, mimetype="application/json")

@basepage.route("/api/v1/images/<image_name>")
def serve_image(image_name):
    path= app.config['UPLOAD_FOLDER'] + "/"+ image_name;
    return send_file( path, mimetype='image/jpeg' )

@basepage.route("/api/v1/imgrecognize", methods=['POST', 'GET'])
def img_recognize():
    start = timer()

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

    #Getting environment variable or using default localhost
    hostname=os.getenv('JDG_HOSTNAME','0.0.0.0')

    remote_cache = RemoteCache(host=hostname)
    times = datetime.datetime.now().strftime("%B-%d-%Y-%I:%M%p")
    key= filename
    remote_cache.put("last_transaction", datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    remote_cache.put(key, json.dumps({'pred':scores, 'timestamp': times , 'filename': filename}) )
    print remote_cache.stats()
    print "Key: %s" % key
    # Send data
    resp = {'pred': scores}

    end = timer()
    total=end - start


    remote_cache.put( "time_taken" , str(total) )

    return Response(
        json.dumps(resp),
        status=200, mimetype="application/json")
