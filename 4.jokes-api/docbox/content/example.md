## Jokes

This is our high-quality Jokes API. You can use this API to request
and remove different jokes.

### Random joke

Retrive a random joke from the joke pool

```endpoint
GET /jokes/v1/random
```

#### Example request

```curl
$ curl http://localhost:3333/v1/jokes/random
```
#### Example response

```json
[
"joke": {
        "id_joke": 9,
        "joke_content": "Why was the computer cold at the office? It left its Windows open!",
        "likes": 0,
        "dislikes": 0
    }
]
```

### Add a new category

Create a new category of jokes

```endpoint
POST /v1/categories
```

#### Example request

```curl
curl -X POST -H "Content-Type: application/json" -d "{ \"category\": \"Funny Jokes\" }" http://localhost:3333/v1/categories
```

#### Example request body

```json
{
    "category":"Funny jokes"
}
```

Property | Description
---|---
`category` | Name of the caterogy

#### Example response

```json
{
    "category": "Fuuny jokes"
}
```

### List all categories

Returns a list of categories

```endpoint
GET /v1/categories/
```

Retrieve all categories in database

#### Example request

```curl
curl http://localhost:3333/v1/categories
```

#### Example response

```json
{
    "categories": [
        {
            "id_category": 1,
            "category": "Dad jokes"
        },
        {
            "id_category": 2,
            "category": "Linux jokes"
        },
        {
            "id_category": 3,
            "category": "Windows jokes"
        }
    ]
}
```

### Random joke from a category of jokes

Retrieves a random joke from a selected category

To escape space in the URL if using categories with space - use `%20`

```endpoint
GET /v1/jokes/category/{category}/random
```

#### Example request

```curl
curl http://localhost:3333/v1/jokes/category/Linux%20jokes/random
```

#### Example response

```json
{
    "joke": {
        "id_joke": 1,
        "joke_content": "Why don't Linux users fear getting lost? Because they always have a shell to guide them!",
        "likes": 0,
        "dislikes": 0
    }
}
```

### List jokes of a category

Retrieve all jokes for a category

```endpoint
GET /v1/jokes/category/{category}
```

#### Example request

```curl
curl http://localhost:3333/v1/jokes/category/Linux%20jokes
```

#### Example response

```json
{
    "jokes": [
        {
            "id_joke": 1,
            "joke_content": "Why don't Linux users fear getting lost? Because they always have a shell to guide them!",
            "likes": 0,
            "dislikes": 0
        },
        {
            "id_joke": 3,
            "joke_content": "Why do programmers prefer Linux? Because you can't 'window' a penguin!",
            "likes": 0,
            "dislikes": 0
        },
        {
            "id_joke": 4,
            "joke_content": "Why don't Linux users make New Year's resolutions? Because they're always improving their 'system'!",
            "likes": 0,
            "dislikes": 0
        }
    ]
}
```

### Joke by ID

Retrive a joke by ID

```endpoint
GET /v1/jokes/{id}
```

#### Example request

```curl
curl https://localhost:3333/v1/jokes/1
```

#### Example response

```json
{
    "joke": {
        "id_joke": 1,
        "joke_content": "Why don't Linux users fear getting lost? Because they always have a shell to guide them!",
        "likes": 0,
        "dislikes": 0
    }
}
```

-------
STOP HERE!
-------

### Insert or update a wibble

Inserts or updates a wibble in a wobble. If there's already a wibble
with the given ID in the wobble, it will be replaced. If there isn't
a wibble with that ID, a new wibble is created.

```endpoint
PUT /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id} \
  -X PUT \
  -d @file.geojson
```

```bash
$ wbl wobble put-wibble wobble-id wibble-id 'geojson-wibble'
```

```javascript
var wibble = {
  "type": "Wobble",
  "properties": { "name": "Null Island" }
};
client.insertWobble(wibble, 'wobble-id', function(err, wibble) {
  console.log(wibble);
});
```

#### Example request body

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

Property | Description
--- | ---
`id` | the id of an existing wibble in the wobble

#### Example response

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

### Retrieve a wibble

Retrieves a wibble in a wobble.

```endpoint
GET /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```curl
curl https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```bash
$ wbl wobble read-wibble wobble-id wibble-id
```

```javascript
client.readWobble('wibble-id', 'wobble-id',
  function(err, wibble) {
    console.log(wibble);
  });
```

```python
wibble = wobbles.read_wibble(wobble_id, '2').json()
```

#### Example response

```json
{
  "id": "{wibble_id}",
  "type": "Wobble",
  "properties": {
    "prop0": "value0"
  }
}
```

### Delete a wibble

Removes a wibble from a wobble.

```endpoint
DELETE /wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

#### Example request

```javascript
client.deleteWobble('wibble-id', 'wobble-id', function(err, wibble) {
  if (!err) console.log('deleted!');
});
```

```curl
curl -X DELETE https://wobble.biz/wobbles/v1/{username}/{wobble_id}/wibbles/{wibble_id}
```

```python
resp = wobbles.delete_wibble(wobble_id, wibble_id)
```

```bash
$ wbl wobble delete-wibble wobble-id wibble-id
```

#### Example response

> HTTP 204
