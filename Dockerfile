FROM node:5.7

MAINTAINER akinoniku

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install

# sync
RUN apt-get update && \
    apt-get install -y rsync && \
    rm -rf /var/lib/apt/lists/*

RUN cd /tmp && \
    wget http://devtools.qiniu.io/qiniu-devtools-linux_amd64-v3.0.20150529.tar.gz && \
    tar -zxvf qiniu-devtools-linux_amd64-v3.0.20150529.tar.gz

RUN apt-get update && \
    apt-get install -y rsync && \
    rm -rf /var/lib/apt/lists/*

#vim
RUN apt-get update && \
    apt-get install -y vim && \
    rm -rf /var/lib/apt/lists/*

# start compile
COPY . /var/bumo/bumo_react
RUN rm -rf /var/bumo/bumo_react/node_modules

RUN mv /tmp/node_modules /var/bumo/bumo_react/

RUN cd /var/bumo/bumo_react && npm run build

# rsync
#RUN rsync -av /var/bumo/bumo_react/dist /srv --exclude *.map
RUN cp -r /var/bumo/bumo_react/dist /tmp/srv/
ADD ./src/favicon.ico /tmp/srv/dist/favicon.ico

# qrsync
# RUN /tmp/qrsync /var/bumo/bumo_react/qr_conf.json

VOLUME /tmp/srv/dist

