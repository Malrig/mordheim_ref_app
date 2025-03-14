FROM nginx:stable-alpine
COPY build/nginx.conf /etc/nginx/nginx.conf
COPY build/conf.d /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
