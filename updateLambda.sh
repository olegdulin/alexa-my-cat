#!/bin/sh -x

FUNCTION_NAME=MyCat

cd src
npm install
zip -r /tmp/${FUNCTION_NAME}.zip *

aws lambda update-function-code --function-name ${FUNCTION_NAME} \
    --zip-file fileb:///tmp/${FUNCTION_NAME}.zip