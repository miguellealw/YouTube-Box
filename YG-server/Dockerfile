# Why use slim variant
# https://stackoverflow.com/questions/62715570/failing-to-install-psycopg2-binary-on-new-docker-container
FROM python:3.9-slim-bookworm

# For alpine
# RUN adduser -D youtubebox

RUN adduser --disabled-password youtubebox

WORKDIR /home/youtubebox-server

# Install dependencies in venv
# RUN python -m venv venv

COPY requirements.txt requirements.txt


# Issues with alpine but not slim-buster
# To allow cryptography to be installed build from source
# delete tools afterwards to a reduce image size
# https://stackoverflow.com/a/53562393
# From https://github.com/pyca/cryptography/issues/2750
# RUN apk add --no-cache \
# 			build-base \
# 			libffi-dev \
# 			openssl-dev && \
# 	pip install --no-cache-dir cryptography==3.4.7 && \
# 	apk del \
# 			build-base \
# 			libffi-dev \
# 			openssl-dev


# Install dependencies, build Python packages, then cleanup build tools
# This must be done in one layer to minimize image size
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    python3-dev \
    && pip3 install --no-cache-dir -r requirements.txt \
    && pip3 install --no-cache-dir gunicorn \
    && apt-get purge -y --auto-remove \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Move files and folders into container
COPY YG_server YG_server
COPY migrations migrations
COPY youtubebox.py config.py boot.sh ./
COPY client_secret_*.json ./
# TODO: copy client secret file from YouTube API to container. Get filename from env variables
# Make shell script executable
RUN chmod a+x boot.sh

# Required by the flask command
ENV FLASK_APP youtubebox.py
ENV FLASK_ENV production

# Change permissions from root to youtubebox user
RUN chown -R youtubebox:youtubebox ./
# Makes the youtubebox user the default for any subsequent instructions
USER youtubebox

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]