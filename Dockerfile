FROM node:6.10.0

LABEL maintainer "me@yannxia.info"

ENV work_path /web/message_centre

# Create app directory
RUN mkdir -p ${work_path}
WORKDIR ${work_path}

COPY . ${work_path}
RUN npm install

EXPOSE 3000

CMD [ "node", "./bin/www" ]