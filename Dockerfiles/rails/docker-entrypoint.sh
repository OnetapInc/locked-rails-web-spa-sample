#!/bin/bash

# Exit on fail
set -e

# Bundle install
# bundle install --path /vendor/bundle
# bundle install --binstubs --path /app/vendor/bundle

socat tcp-listen:3366,reuseaddr,fork tcp:mysqld:3366&
# Remove puma pid if existed

rm -f /app/tmp/pids/server.pid

# Start services
bundle exec rails s -b 0.0.0.0 -p 3443

# Finally call command issued to the docker service
exec "$@"