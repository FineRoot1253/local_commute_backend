#!/bin/bash
docker buildx create --name multiarch-builder --use 
cd resource_server/ && docker buildx build --platform linux/arm64/v8,linux/amd64 -t gjhong1129/examples:local_commute_resource_backend_v0.0.1 --push .