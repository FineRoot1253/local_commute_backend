FROM mariadb
ARG BUILDPLATFORM
RUN echo $BUILDPLATFORM
ADD app.js /app.js
ENTRYPOINT ["node", "app.js"]