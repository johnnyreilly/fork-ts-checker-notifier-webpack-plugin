FROM node:12

WORKDIR /fork-ts-checker-notifier-webpack-plugin

# install packages
COPY package.json yarn.lock /fork-ts-checker-notifier-webpack-plugin/
RUN yarn

# build
COPY .npmignore index.ts tsconfig.json CHANGELOG.md LICENSE.md README.md /fork-ts-checker-notifier-webpack-plugin/
COPY images /fork-ts-checker-notifier-webpack-plugin/images/
COPY types /fork-ts-checker-notifier-webpack-plugin/types/
RUN yarn build

# tests
COPY index.test.ts /fork-ts-checker-notifier-webpack-plugin/
# RUN yarn test

# build and run tests with:
# docker build -t fork-ts-checker-notifier-webpack-plugin . 
# docker run -it fork-ts-checker-notifier-webpack-plugin yarn test
