#!/bin/bash

set -e pipefail

echo "Publishing npm to Github Packages"

CURRENT_PATH=$(pwd)

npm config set email noreply@opintopolku.fi
npm config set always-auth true
npm config set registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken $NPM_TOKEN

cp package.json build
cp package-lock.json build
cp README.md build

cd build
npm publish
cd $CURRENT_PATH