#!/bin/bash

# Deploy static
aws s3 sync static/public s3://account.markerr.com/ --acl public-read --cache-control "public, max-age=86000" --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E99G5OHP70H2B --paths /*