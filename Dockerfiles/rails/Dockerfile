FROM node:9.10.0
FROM ruby:2.3.7
ENV LANG C.UTF-8
ENV APP /app
ENV BUNDLE_PATH /vendor/bundle
RUN mkdir $APP
WORKDIR $APP

RUN apt-get update -qq \
    && apt-get install -y \
        build-essential \
        bash \
        mysql-client \
        vim \
        imagemagick \
    &&rm -rf /var/lib/apt/lists/* /var/cache/apt/* && touch Gemfile.lock

COPY ./server/Gemfile $APP/Gemfile

RUN bundle install --path=$APP/vendor/bundle --jobs 4
COPY ./server $APP