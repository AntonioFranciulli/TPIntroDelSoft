#!/bin/bash

sudo apt update
sudo apt install python3-pip
pip install --user pipenv
mkdir .venv
pipenv install flask


