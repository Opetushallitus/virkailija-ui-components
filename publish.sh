
#!/bin/bash

CURRENT_PATH=$(pwd)

npm run build
cp package.json build
cp package-lock.json build
cp README.md build
cd build
npm publish --access public
cd $CURRENT_PATH
