#!/bin/bash

set -e pipefail

npm run lint
./node_modules/.bin/tsc
npm run build