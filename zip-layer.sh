#!/bin/sh

echo "Zipping Layer, please wait ..."
mkdir dist
zip -q -r dist/layer.zip package.json package-lock.json node_modules