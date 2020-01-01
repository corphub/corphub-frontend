FROM node:13.5-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY package.json /usr/src/nuxt-app/

RUN npm install

COPY . /usr/src/nuxt-app/

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

ENV graphql_host=http://corphub-backend-service:8082
ENV elastic_search_host=http://10.106.32.106:9200
ENV graphql_endpoint=http://corphub-backend-service:8082/graphql


# start the app
CMD [ "npm", "start" ]
