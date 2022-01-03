FROM node:12-slim

#ENV DEBIAN_FRONTEND noninteractive
#RUN apt-get -y update && \
#    apt-get -y upgrade && \
#    apt-get -y install less emacs-nox && \
#    apt-get clean

ENV NODE_ENV=production

VOLUME /opt
ADD . /opt/file-upload
WORKDIR /opt/file-upload

#RUN npm ci
#RUN npm install -g parcel-bundler
#RUN npm run build

EXPOSE 3100

CMD ["node","bin/www"]
