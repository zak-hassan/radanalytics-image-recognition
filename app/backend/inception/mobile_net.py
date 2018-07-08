from app.backend.inception import download
import os
import numpy as np
import tensorflow as tf
import cv2

data_url = "http://download.tensorflow.org/models/mobilenet_v1_1.0_192_frozen.tgz"
model_name = "_".join(os.path.basename(data_url).split('_')[0:4])
data_dir = ".mobile_net"
path_frozen_graph = "frozen_graph.pb"
path_quantized_graph = "quantized_graph.pb"
path_class_to_name = "labels.txt"


def maybe_download():
    """
    Download the Inception model from the internet if it does not already
    exist in the data_dir. The file is about 85 MB.
    """

    print("Downloading Mobilenet Model ...")
    download.maybe_download_and_extract(url=data_url, download_dir=data_dir)


def create_model_info(architecture, model_file_name=None, label_file_name=None):
    architecture = architecture.lower()

    size = int(model_name.split("_")[3])
    is_quantized = bool(
        len(architecture.split("_")) == 5 and architecture.split("_")[4] == "quantized")
    dirname = "_".join(architecture.split("_")[:4])
    if not model_file_name:
        if is_quantized:
            model_base_name = path_quantized_graph
        else:
            model_base_name = path_frozen_graph
        model_file_name = os.path.join(data_dir, model_name, model_base_name)

    if not label_file_name:
        label_file_name = os.path.join("checkpoints", 'inception_v3',
                                       'imagenet_2012_challenge_label_map_proto.pbtxt')

    # for bottelneck use  MobilenetV1/Predictions/Reshape
    bottleneck_tensor_name = 'MobilenetV1/Predictions/Reshape_1:0'
    bottleneck_tensor_size = 1001
    input_width = size
    input_height = size
    input_depth = 3
    resized_input_tensor_name = 'input:0'
    input_mean = 127.5
    input_std = 127.5

    return {
        'output_layer': bottleneck_tensor_name,
        'output_layer_size': bottleneck_tensor_size,
        'label_file_name': label_file_name,
        'input_width': input_width,
        'input_height': input_height,
        'input_depth': input_depth,
        'input_layer': resized_input_tensor_name,
        'model_file_name': model_file_name,
        'input_mean': input_mean,
        'input_std': input_std,
    }


def get_model_labels(label_file_name, output_layer_size):
    # TODO: To be completed!!
    return range(output_layer_size)


def load_graph(filename):
    with tf.Graph().as_default() as graph:
        with tf.gfile.FastGFile(filename, 'rb') as f:
            graph_def = tf.GraphDef()
            graph_def.ParseFromString(f.read())
            tf.import_graph_def(graph_def, name='')
        return graph


def adapt_image_to_model(graph, input_width, input_height, input_depth, input_mean, input_std):
    with graph.as_default():
        decoded_image = tf.placeholder(dtype=tf.float32, shape=[None, None, 3],
                                       name="Image_Placeholder")
        decoded_image_as_float = tf.cast(decoded_image, dtype=tf.float32)
        decoded_image_4d = tf.expand_dims(decoded_image_as_float, 0)
        resize_shape = tf.stack([input_height, input_width])
        resize_shape_as_int = tf.cast(resize_shape, dtype=tf.int32)
        resized_image = tf.image.resize_bilinear(decoded_image_4d, resize_shape_as_int)
        offset_image = tf.subtract(resized_image, input_mean)
        mul_image = tf.multiply(offset_image, 1.0 / input_std)
    return decoded_image, mul_image


class NameLookup:

    def __init__(self):
        self._cls_to_name = {}   # Map from cls to uid.

        # Read the uid-to-name mappings from file.
        path = os.path.join(data_dir, model_name, path_class_to_name)
        with open(path, 'r') as f:
            # Read all lines from the file.
            lines = f.readlines()

            for line in lines:
                line = line.replace("\n", "")
                elements = line.split(":")

                # Get the class.
                cls = int(elements[0])

                # Get the class-name.
                name = elements[1]

                # Insert into the lookup-dict.
                self._cls_to_name[cls] = name

    def cls_to_name(self, cls, only_first_name=False):
        """
        Return the class-name from the integer class-number.
        """
        name = self._cls_to_name[cls]
        if only_first_name:
            name = name.split(",")[0]
        return name


class MobileNet:
    def __init__(self):
        # Mappings between class-numbers and class-names.
        # Used to print the class-name as a string e.g. "horse" or "plant".
        self.name_lookup = NameLookup()

        self.architecture = "mobilenet_v1_1.0_224_quantized"
        self.info = create_model_info(self.architecture, None)
        self.labels = get_model_labels(self.info["label_file_name"], self.info["output_layer_size"])
        self.graph = load_graph(self.info["model_file_name"])

        (self.resize_ip_tensor, self.resize_op_tensor) = adapt_image_to_model(self.graph, self.info[
            "input_width"], self.info["input_height"], self.info["input_depth"], self.info["input_mean"], self.info["input_std"])

        self.input_layer = self.graph.get_tensor_by_name(self.info["input_layer"])
        self.output_layer = self.graph.get_tensor_by_name(self.info["output_layer"])

        self.session = tf.Session(graph=self.graph)

    def close(self):
        self.session.close()

    def classify(self, image_path=None, image=None):
        result = []
        image_data = cv2.imread(image_path)
        resized_input_values = self.session.run(self.resize_op_tensor, feed_dict={self.resize_ip_tensor: image_data})
        predictions, = self.session.run(self.output_layer, feed_dict={self.input_layer: resized_input_values})
        return predictions

    def get_scores(self, pred, k=10, only_first_name=True):
        # Get a sorted index for the pred-array.
        idx = pred.argsort()

        # The index is sorted lowest-to-highest values. Take the last k.
        top_k = idx[-k:]
        scores = []

        # Iterate the top-k classes in reversed order (i.e. highest first).
        for cls in reversed(top_k):
            # Lookup the class-name.
            name = self.name_lookup.cls_to_name(cls=cls, only_first_name=only_first_name)

            # Predicted score (or probability) for this class.
            score = pred[cls]
            score = round(float(score)*100, 4)

            # Print the score and class-name.
            scores.append((score, name))

        return scores
