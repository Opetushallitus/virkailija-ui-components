#!/bin/bash

set -e pipefail

echo "Publishing npm to https://artifactory.opintopolku.fi/"

CURRENT_PATH=$(pwd)

npm config set email noreply@opintopolku.fi
npm config set always-auth true
npm config set registry https://artifactory.opintopolku.fi/
npm config set _auth $NPM_TOKEN

cp package.json build
cp package-lock.json build
cp README.md build

cd build
npm publish --access public
cd $CURRENT_PATH