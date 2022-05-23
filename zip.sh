#!/bin/sh

NAMES=('MeasurementsGET' 'MeasurementsPOST')
# zip
cd dist
for name in "${NAMES[@]}"
do
  echo "Zipping $name, please wait ..."
  zip -q -r $name.zip $name/index.js $name/index.js.map
done
cd ..
