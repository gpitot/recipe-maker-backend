#!/bin/sh

echo "Zipping Layer, please wait ..."
cd src/CommonLayer
mkdir dist
zip -q -r dist/nodejs.zip nodejs