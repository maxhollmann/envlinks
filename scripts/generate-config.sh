#!/bin/bash
set -eu

out="${1:-/srv/www/config.js}"
mkdir -p "$(dirname "$out")"

env_json=$(
  for var in $(compgen -e); do
    case "$var" in
      LINK_*|LINKS_*)
        jq -n --arg key "$var" --arg value "${!var}" '{key: $key, value: $value}'
        ;;
    esac
  done | jq -s 'from_entries'
)

printf 'window.env = %s;\n' "$env_json" > "$out"

count=$(printf '%s' "$env_json" | jq 'length')
echo "Wrote $count env var(s) to $out"
