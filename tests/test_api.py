import json
from os.path import abspath, dirname, join, isfile
from io import BytesIO


def test_route_root(client):
    response = client.get('/')
    assert response.status_code == 200


def test_post_img(client, app):
    file_name = app.config['IMAGE_FILE']

    # If the test folder is moved this will need to be adjusted
    img_path = join(abspath(dirname(__file__)), 'resources', 'panda.jpg')

    with open(img_path, "rb") as image_file:
        data = dict(file=(BytesIO(image_file.read()), file_name))
        headers = {'content-type': 'multipart/form-data'}

        response = client.post('/api/v1/imgrecognize', data=data,
                               headers=headers)

        assert response.status_code == 200
        assert isfile(join(app.config['UPLOAD_FOLDER'], file_name))

        res_data = json.loads(response.data)
        assert res_data['pred'][0][1] == 'giant panda'
