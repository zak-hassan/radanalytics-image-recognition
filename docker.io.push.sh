#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
MAINTAINERS="Zak Hassan"
COMPONENT="image-recognition-service"

#cleaning up the image folder:
rm -rf .rad-img-recog/*

K8_MODEL_VERSION=docker.io/zmhassan/tensorflow-image-recognition:v2
IMAGE_NAME=tensorflow-image-recognition

# docker run   -p 8081:8081  docker.io/zmhassan/tensorflow-image-recognition
docker   build  --rm -t  $IMAGE_NAME  .

docker tag  $IMAGE_NAME $K8_MODEL_VERSION
docker push  $K8_MODEL_VERSION
