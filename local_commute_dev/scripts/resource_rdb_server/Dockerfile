FROM mariadb:latest
ARG BUILDPLATFORM
RUN echo $BUILDPLATFORM

ADD ./init.sql /docker-entrypoint-initdb.d/

VOLUME [ "/var/lib/mysql" ]