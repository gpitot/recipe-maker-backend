#!/bin/sh

NAMES=('DBConnect' 'MeasurementsGET')
# zip
cd dist
for name in "${NAMES[@]}"
do
  echo "Zipping $name, please wait ..."
  zip -q -r $name.zip $name/index.js $name/index.js.map
done
cd ..

#deploy 
# cd infrastructure
# for name in "${NAMES[@]}"
# do
#   echo "Deploying $name, please wait ..."
#   npx cdk deploy aws lambda update-function-code --function-name $name --zip-file fileb://dist/$name.zip
# done
