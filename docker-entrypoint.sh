#!/bin/sh
set -eu

/app/generate-config.sh /srv/www/config.js

exec "$@"
