#!/bin/bash
# Jupyter has issues with being run directly:
#   https://github.com/ipython/ipython/issues/7062
# We just add a little wrapper script.
export BASE_PATH=$PWD
exec python server.py
