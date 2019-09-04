
#!/bin/bash

CURRENT_PATH=$(pwd)

npm run build
cp package.json build
cp package-lock.json build
cd build
npm publish --access public
cd $CURRENT_PATH
