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
curl $SENTRY_RELEASE_HOOK_URL \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"version": "'$VERSION'"}'
