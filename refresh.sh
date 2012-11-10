#!/bin/sh


killall node

echo "drop keyspace oae;" > .drop-oae.cql
/opt/cassandra/bin/cqlsh -f .drop-oae.cql

node app.js > server.log &
