#!/bin/bash

set -e pipefail

echo "Copying Storybook files to AWS S3 buildnumber (ci-$TRAVIS_BUILD_NUMBER) directory"
aws s3 sync storybook-static s3://dev-files.ops.opintopolku.fi/storybooks/virkailija-ui-components/builds/ci-$TRAVIS_BUILD_NUMBER --delete --cache-control max-age=600 --acl public-read
echo "Storybook link (temporary for build): https://dev-files.ops.opintopolku.fi/storybooks/virkailija-ui-components/builds/ci-$TRAVIS_BUILD_NUMBER/index.html"

echo "Copying Storybook files to AWS S3 branch ($TRAVIS_BRANCH) directory"
aws s3 sync storybook-static s3://dev-files.ops.opintopolku.fi/storybooks/virkailija-ui-components/$TRAVIS_BRANCH --delete --cache-control max-age=600 --acl public-read
echo "Storybook link (pernament for branch): https://dev-files.ops.opintopolku.fi/storybooks/virkailija-ui-components/$TRAVIS_BRANCH/index.html"
