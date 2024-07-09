FROM unit:latest

COPY .docker/unit.conf.json /docker-entrypoint.d/

# Site dir
RUN mkdir /static
WORKDIR /static

# Log dir
RUN mkdir /var/log/unit

COPY ./.vitepress/dist .

EXPOSE 80
