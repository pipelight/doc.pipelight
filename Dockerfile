FROM unit:latest

COPY .docker/unit.conf.json /docker-entrypoint.d/

RUN mkdir /static
WORKDIR /static

COPY ./.vitepress/dist .

EXPOSE 80
