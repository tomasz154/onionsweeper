#!/bin/sh

set -e

ssh $DEPLOY_USER@$DEPLOY_HOST '(rm -Rf '$DEPLOY_DIRECTORY'/next || true) && mkdir '$DEPLOY_DIRECTORY'/next'

scp -r build $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_DIRECTORY/next/public

ssh $DEPLOY_USER@$DEPLOY_HOST '\
    cd '$DEPLOY_DIRECTORY' && \
    rm -rf previous || true && \
    mv current previous || true && \
    mv next current
'
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
