#!/usr/bin/env bash

set -o errexit

pip install -r requirements.txt

python manage.py migrate
python manage.py collectstatic --no-input

if [ -f data.json ]; then
    python manage.py loaddata data.json
fi