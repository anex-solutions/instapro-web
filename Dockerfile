FROM node:alpine as build

COPY ./react_app /react_app
WORKDIR /react_app
RUN npm i
RUN npm run-script build


FROM nginx:alpine

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=1m --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost || exit 1
  

COPY --from=build /react_app/build /usr/share/nginx/html

RUN chmod -R 0777 /usr/share/nginx/html

