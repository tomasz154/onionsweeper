#!/bin/sh

set -e

echo $DEPLOY_HOST_FINGERPRINT >> ~/.ssh/known_hosts

ssh $DEPLOY_USER@$DEPLOY_HOST '(rm -Rf '$DEPLOY_DIRECTORY'/next || true) && mkdir '$DEPLOY_DIRECTORY'/next'

scp -r build $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_DIRECTORY/next/public

ssh $DEPLOY_USER@$DEPLOY_HOST '\
    cd '$DEPLOY_DIRECTORY' && \
    rm -rf previous || true && \
    mv current previous || true && \
    mv next current
'
