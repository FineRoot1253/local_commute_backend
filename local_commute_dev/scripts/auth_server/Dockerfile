FROM node:fermium-buster-slim
ARG BUILDPLATFORM
RUN echo $BUILDPLATFORM
ADD app.js /app.js
ENTRYPOINT ["node", "app_auth.js"]