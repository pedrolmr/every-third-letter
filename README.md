# EVERY THIRD LETTER REST API

This API accepts a POST request to the route “/test”, which accepts one argument `string_to_cut` and returns a JSON object with the key `return_string` and a string containing every third letter from the original string

## Get list of words

`GET /test/`

    curl -i -H 'Accept: application/json' https://every-third-letter.herokuapp.com/test/

## Create new word and get every third letter of the word
`POST /test/`

    curl -X POST https://every-third-letter.herokuapp.com/test/ --data '{"string_to_cut": "iamyourlyftdriver"}' -H 'Content-Type: application/json'
