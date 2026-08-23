#!/usr/bin/env bash
set -euo pipefail

: "${MODB_API_KEY:?Set MODB_API_KEY before running this script}"
: "${MODB_MODEL:?Set MODB_MODEL before running this script}"
base_url="${MODB_BASE_URL:-https://modbapi.com/v1}"
base_url="${base_url%/}"
timeout="${MODB_TIMEOUT_SECONDS:-30}"

curl --fail-with-body --silent --show-error \
  --connect-timeout 10 --max-time "$timeout" \
  "$base_url/chat/completions" \
  -H "Authorization: Bearer $MODB_API_KEY" \
  -H "Content-Type: application/json" \
  --data "{\"model\":\"$MODB_MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"Reply with one short greeting.\"}],\"stream\":false,\"max_tokens\":64}"
