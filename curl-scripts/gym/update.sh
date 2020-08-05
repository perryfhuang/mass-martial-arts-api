#!/bin/bash

API="http://localhost:4741"
URL_PATH="/gyms"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "gym": {
    "name": "'"${NAME}"'",
    "concentration": "'"${CONCENTRATION}"'",
    "address": {
      "street": "'"${STREET}"'",
      "city": "'"${CITY}"'",
      "state": "'"${STATE}"'"
    },
    "zip": "'"${ZIP}"'",
    "hours": "'"${HOURS}"'"
  }
}'

echo
