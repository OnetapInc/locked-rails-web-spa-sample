#!/bin/bash

# Exit on fail
set -e

socat tcp-listen:3443,reuseaddr,fork tcp:rails_app:3443&

yarn install

yarn run dev

# Finally call command issued to the docker service
exec "$@"