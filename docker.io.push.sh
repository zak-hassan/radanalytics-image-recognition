#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
MAINTAINERS="Zak Hassan"
COMPONENT="image-recognition-service"


# docker run   -p 8081:8081  docker.io/zmhassan/tensorflow-image-recognition
docker   build  --rm -t  tensorflow-image-recognition  .

docker tag  tensorflow-image-recognition docker.io/zmhassan/tensorflow-image-recognition
docker push  docker.io/zmhassan/tensorflow-image-recognition
