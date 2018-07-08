from __future__ import print_function
from __future__ import print_function
from flask import jsonify, request, Response, Blueprint, render_template, send_file
from flask import current_app as app
from app.backend.inception import inception, mobile_net
from werkzeug.utils import secure_filename
from infinispan.remotecache import RemoteCache
from timeit import default_timer as timer
import os.path
import os
import json
import datetime
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
                    'description': "A (relative) path to where the server uploads the images."},
                "allowed_Extensions": {
                    'data': app.config['ALLOWED_EXTENSIONS'],
                    'description': "A list of comma-separated file extensions that the model will accept."
                }
            }
        }

        return Response(json.dumps(mock_data), status=200, mimetype="application/json")
    else:  # POST

        data = request.data
        dataDict = json.loads(data)
        print("QUERY: "+dataDict.get("query"))
        config_change={}
        config_change["config_change"]=[]
        for con in dataDict.get("config"):
            config_change["config_change"].append({ "field":con.get("field"),
                                                    "new_value":con.get("new_value"),
                                                    "status": "changed"})
        # TODO: Validate that field is in the list of correct keys:
        # ['UPLOAD_FOLDER','IMAGE_FILE','ALLOWED_EXTENSIONS','INCEPTION_MODEL','TRAINED_MODEL_URL']
        app.config[con.get("field").upper()]=con.get("new_value")

        return Response(json.dumps(config_change), status=200, mimetype="application/json")
        #
        # mock_data = {
        #     "config_change": [
        #         {
        #             "field": "training_model_uri",
        #             "new_value": "http://new/uri/to/trained_model/uri",
        #             "status": "changed"
        #         },
        #         {
        #             "field": "upload_folder",
        #             "new_value": "new/path/to/upload/folder",
        #             "status": "changed"
        #         },
        #         {
        #             "field": "allowed_Extensions",
        #             "new_value": "jpeg,jpg,png",
        #             "status": "changed"
        #         }
        #     ]}
        #
        #
        # return Response(json.dumps(mock_data), status=200, mimetype="application/json")


@basepage.route("/api/v1/images", methods=['POST','GET'])
def get_images():
    return Response(
        json.dumps(os.listdir(app.config['UPLOAD_FOLDER'])),
        status=200, mimetype="application/json")


@basepage.route("/api/v1/historyServer", methods=['GET'])
def get_jdg_history():
    hostname = os.getenv('JDG_HOSTNAME', '0.0.0.0')
    basepath = os.getenv('BASE_PATH', '/opt/imagerecognize/')
    remote_cache = RemoteCache(host=hostname)

    # os.chdir(basepath)

    files=glob.glob(".rad-img-recog/*")
    mock_data = {}
    mock_data["results"] = []
    bulk_data = remote_cache.bulk_get()
    for f in files:
        name = bulk_data[(f.split("/")[1])]
        data = json.loads(name)

        # print data
        mock_data["results"].append({
            "filename": f.split("/")[1],
            "classification": data["pred"][0][1],
            "percentage":data["pred"][0][0]
        })
    mock_data['time_taken'] = remote_cache.get("time_taken")
    mock_data['last_transaction'] = remote_cache.get("last_transaction")

    if len(files) < 10:
        mock_data["num_results"]= len(files)
        mock_data["num_pages"] = 1
    else:
        mock_data["num_results"] = len(files)
        total_files = len(files)
        num = total_files/10
        if total_files % 10 != 0:
            num = num+1
        mock_data["num_pages"] = num
    print (mock_data)
    return Response(json.dumps(mock_data), status=200, mimetype="application/json")


@basepage.route("/api/v1/images/<image_name>")
def serve_image(image_name):
    path = app.config['UPLOAD_FOLDER'] + "/" + image_name
    return send_file(path, mimetype='image/jpeg')


# Use Inception Model
def inception_get_scores(img_path):
    inception.data_dir = app.config['INCEPTION_MODEL']
    inception.maybe_download()
    model = inception.Inception()
    pred = model.classify(image_path=img_path)
    scores = model.get_scores(pred=pred, k=5)
    model.close()

    return scores


# Use mobileNet
def mobilenet_get_scores(img_path):
    mobile_net.data_dir = app.config['MOBILE_NET']
    mobile_net.maybe_download()
    model = mobile_net.MobileNet()
    pred = model.classify(image_path=img_path)
    scores = model.get_scores(pred=pred, k=5)

    return scores


@basepage.route("/api/v1/imgrecognize", methods=['POST', 'GET'])
def img_recognize():
    start = timer()

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    file = request.files['file']

    # TODO :
    # if file and allowed_file(file.filename):

    filename = secure_filename(file.filename)
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(img_path)

    # scores = inception_get_scores(img_path)
    scores = mobilenet_get_scores(img_path)

    # Getting environment variable or using default localhost
    hostname = os.getenv('JDG_HOSTNAME', '0.0.0.0')

    remote_cache = RemoteCache(host=hostname)
    times = datetime.datetime.now().strftime("%B-%d-%Y-%I:%M%p")
    key = filename
    remote_cache.put("last_transaction", datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    remote_cache.put(key, json.dumps({'pred': scores, 'timestamp': times, 'filename': filename}))
    print(remote_cache.stats())
    print("Key: %s" % key)
    # Send data
    resp = {'pred': scores}

    end = timer()
    total = end - start

    remote_cache.put("time_taken", str(total))

    return Response(
        json.dumps(resp),
        status=200, mimetype="application/json")
