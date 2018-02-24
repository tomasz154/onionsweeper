#!/bin/sh

set -e

curl https://sentry.io/api/0/organizations/$SENTRY_ORGANIZATION/releases/ \
  -X POST \
  -H 'Authorization: Bearer '$SENTRY_KEY \
  -H 'Content-Type: application/json' \
  -d '{
    "version": "'$VERSION'",
    "projects": ["'$SENTRY_PROJECT'"]
   }'

curl https://sentry.io/api/0/organizations/$SENTRY_ORGANIZATION/releases/$VERSION/deploys/ \
  -X POST \
  -H 'Authorization: Bearer '$SENTRY_KEY \
  -H 'Content-Type: application/json' \
  -d '{
    "environment": "'$ENVIRONMENT'"
   }'
