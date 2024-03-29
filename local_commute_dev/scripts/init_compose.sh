#!/bin/bash

echo "Chat-Server Start to Initialize"

mkdir -p -m 777  ./volume/redis/data/

echo "Chat-Server Volume Set Complete"

docker-compose config

docker-compose down

docker-compose up

echo "Chat-Server Initialize Complete!"

exit 0