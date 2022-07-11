#!/bin/bash
# https://github.com/nats-io/nats-server
# Release v2.8.4
version="2.8.4"
os="linux-amd64"
curl -L https://github.com/nats-io/nats-server/releases/download/v${version}/nats-server-v${version}-${os}.zip -o nats-server.zip
unzip nats-server.zip -d nats-server
sudo cp nats-server/nats-server-v${version}-${os}/nats-server /usr/bin
rm nats-server.zip
rm -rf nats-server
