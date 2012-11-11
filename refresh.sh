#!/bin/sh

killall node

echo "drop keyspace oae;" > .drop-cql
/opt/cassandra/bin/cqlsh -f ./.drop-cql

node app.js > server.log &
