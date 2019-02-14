# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
ARG GIT_SHA=master
WORKDIR /app

EXPOSE 3123


RUN GIT_SHA="${GIT_SHA:-master}"
RUN echo "${GIT_SHA}"

RUN echo "Building git sha: ${GIT_SHA}" && \
  git clone --depth 5 https://github.com/bolt-design-system/bolt.git . && \
  git checkout master

RUN if git show-ref --quiet ${GIT_SHA}; then git checkout "${GIT_SHA}"; fi;

RUN rm -rf /app/packages/uikit-workshop /app/package.json /app/example-integrations /app/docs-site/src/assets

COPY www  /app/www
#COPY server /app/server
#COPY packages/build-tools/package.json /app/packages/build-tools/package.json
COPY packages/twig-renderer /app/packages/twig-renderer
COPY packages/drupal-twig-extensions /app/packages/drupal-twig-extensions
COPY packages/core-php /app/packages/core-php

RUN yarn --cwd server --ignore-optional --ignore-platform --ignore-scripts --ignore-engines --skip-integrity-check --production --modules-folder node_modules

CMD node server/index.js
