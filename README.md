# Radanalytics Image Recognition with Tensorflow

![alt tag](https://raw.githubusercontent.com/zmhassan/radanalytics-image-recognition/master/imgs/screenshot.png)

# Building and running the application
Install all python dependencies
```bash
pip install -r requirements.txt
```
Install and build all js dependencies
```bash
npm install
npm run build
```

To start the app
```bash
python app.py
```

The webui is now accessible from `0.0.0.0:8081`

# Development and testing

Rebuild webpack when frontend file change occurs
```bash
npm run dev
```

# Dependencies


The rest api stores results in jdg cache. You will need docker to run.
To run JDG you need to execute the following:

```bash
./run-jdg-docker.sh
```
