# tensorflow/jupyter notebook
FROM centos:latest

MAINTAINER Zak Hassan <zak.hassan1010@gmail.com>

USER root

## taken/adapted from jupyter dockerfiles
# Not essential, but wise to set the lang
# Note: Users with other languages should set this in their derivative image
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8
ENV PYTHONIOENCODING UTF-8
ENV CONDA_DIR /opt/conda
ENV NB_USER=nbuser
ENV NB_UID=1011
ENV NB_PYTHON_VER=2.7
## tensorflow ./configure options for Bazel
ENV PYTHON_BIN_PATH /opt/conda/bin/python
ENV PYTHON_LIB_PATH /opt/conda/lib/python2.7/site-packages
ENV TENSORBOARD_LOG_DIR /workspace


# Python binary and source dependencies and Development tools
RUN echo 'PS1="\u@\h:\w\\$ \[$(tput sgr0)\]"' >> /root/.bashrc \
    && mkdir -p /tf \
    && yum install -y curl wget bzip2 gnupg2 sqlite3 \
    && yum install -y epel-release tar git \
    && yum clean all -y \
    && chgrp -R root /opt \
    && chmod -R ug+rwx /opt \
    && chgrp root /etc/passwd \
    && chmod ug+rw /etc/passwd \
    && cd /tmp \
    && wget -q https://repo.continuum.io/miniconda/Miniconda3-4.2.12-Linux-x86_64.sh \
    && echo d0c7c71cc5659e54ab51f2005a8d96f3 Miniconda3-4.2.12-Linux-x86_64.sh | md5sum -c - \
    && bash Miniconda3-4.2.12-Linux-x86_64.sh -b -p $CONDA_DIR \
    && rm Miniconda3-4.2.12-Linux-x86_64.sh \
    && export PATH=/opt/conda/bin:$PATH \
    && yum install -y gcc gcc-c++ glibc-devel nodejs python-pip \
    && /opt/conda/bin/conda install --quiet --yes python=$NB_PYTHON_VER 'nomkl' \
                'ipywidgets=5.2*' \
                'matplotlib=1.5*' \
                'scipy=0.17*' \
                'seaborn=0.7*' \
                'cloudpickle=0.1*' \
                statsmodels \
                pandas \
                'dill=0.2*' \
                numpy \
                scikit-learn \
                tensorflow \
                psutil \
                pillow \
                nltk \
                gitpython \
                requests \
    && yum erase -y gcc gcc-c++ glibc-devel \
    && yum clean all -y \
    && rm -rf /root/.npm \
    && rm -rf /root/.cache \
    && rm -rf /root/.config \
    && rm -rf /root/.local \
    && rm -rf /root/tmp \
    && useradd -m -s /bin/bash -N -u $NB_UID $NB_USER \
    && usermod -g root $NB_USER \
    && chown -R $NB_USER $CONDA_DIR \
    && conda remove --quiet --yes --force qt pyqt \
    && conda remove --quiet --yes --force --feature mkl ; conda clean -tipsy \
    && mkdir /workspace && chown $NB_UID:root /workspace && chmod 1777 /workspace \
    && mkdir -p -m 700 /home/$NB_USER/.jupyter/ \
    && echo "c.NotebookApp.ip = '*'" >> /home/$NB_USER/.jupyter/jupyter_notebook_config.py \
    && echo "c.NotebookApp.open_browser = False" >> /home/$NB_USER/.jupyter/jupyter_notebook_config.py \
    && echo "c.NotebookApp.notebook_dir = '/workspace'" >> /home/$NB_USER/.jupyter/jupyter_notebook_config.py \
    && chown -R $NB_UID:root /home/$NB_USER \
    && chmod g+rwX,o+rX -R /home/$NB_USER

ENV PATH /opt/conda/bin:$PATH

# TensorBoard # IPython
EXPOSE 6006 8888 8081 18081

LABEL io.k8s.description="Tensorflow Image Recognition." \
      io.k8s.display-name="Tensorflow Image Recognition." \
      io.openshift.expose-services="8888:http,6006:http,8081:http,18081:http"

# ADD start.sh /start.sh
# ADD tensorflow_model_server /tf/tensorflow_model_server

ADD . /opt/imagerecognize
WORKDIR /opt/imagerecognize

ENV TINI_VERSION v0.9.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /opt/imagerecognize/tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini.asc /opt/imagerecognize/tini.asc
RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys 0527A9B7 && gpg --verify /opt/imagerecognize/tini.asc

ENV PATH /opt/imagerecognize:$PATH
# Installing application code
RUN pip install -r requirements.txt \
 && npm install && npm run build


RUN chmod +x tini  start.sh

RUN chmod -R 777 /opt/imagerecognize/.rad-img-recog

ENV HOME /home/$NB_USER
USER $NB_UID
# Make the default PWD somewhere that the user can write. This is
# useful when connecting with 'oc run' and starting a 'spark-shell',
# which will likely try to create files and directories in PWD and
# error out if it cannot.

ENTRYPOINT ["tini", "--"]

CMD ["start.sh"]
