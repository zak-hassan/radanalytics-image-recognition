FROM radanalyticsio/openshift-spark

USER root


ADD . /opt/imagerecognize

WORKDIR /opt/imagerecognize

RUN yum install -y python-pip nodejs \
 && pip install -r requirements.txt \
 && npm install && npm run build
#pip install --upgrade numpy scipy wheel cryptography && \
RUN  pip install --upgrade https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-0.10.0rc0-cp35-cp35m-linux_x86_64.whl

USER 185

CMD python server.py
