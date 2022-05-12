# EVERY THIRD LETTER REST API

## Get list of words

`GET /test/`

    curl -i -H 'Accept: application/json' https://every-third-letter.herokuapp.com/test/

## Create new word and get every third letter of the word
`POST /test/`

    curl -X POST https://every-third-letter.herokuapp.com/test/ --data '{"string_to_cut": "iamyourlyftdriver"}' -H 'Content-Type: application/json'
