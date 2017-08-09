#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
MAINTAINERS="Zak Hassan"
COMPONENT="recommend-service"


docker   build  --rm -t  tensorflow-image-recognition  .

docker tag  tensorflow-image-recognition docker.io/tensorflow-image-recognition
docker push  docker.io/zmhassan/tensorflow-image-recognition
