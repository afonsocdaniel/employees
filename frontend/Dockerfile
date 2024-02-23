FROM node:20.11-alpine
LABEL maintainer="Daniel Filho <daniel.acfilho@gmail.com>"

ENV NODE_ENV=development
ENV APP_ROOT /home/app/
ENV PORT 3000
ENV HOST 0.0.0.0

# Add a non-root user
RUN addgroup app && \
  adduser -S -G app app
USER app

WORKDIR ${APP_ROOT}

COPY --chown=app:app package*.json .

RUN npm install
COPY . ${APP_ROOT}
EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
