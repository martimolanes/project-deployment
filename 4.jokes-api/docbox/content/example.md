This is our high-quality Jokes API. You can use this API to request
and remove different jokes.

### Random joke

Retrive a random joke from the joke pool

```endpoint
GET /v1/jokes/random
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
curl http://localhost:3333/v1/jokes/1
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

### Add a new joke to a category

Adds a new joke to already existing category.

```endpoint
POST /v1/jokes/category/{category}
```

#### Example request

```curl
curl -X POST -H "Content-Type: application/json" -d "{ \"joke_content\": \"Why don't skeletons fight each other? They don't have the guts.\" }" http://localhost:3333/v1/jokes/category/Dad%20jokes
```

#### Example request body

```json
{
  "joke_content": "Why don't skeletons fight each other? They don't have the guts."
}
```

Property | Description
--- | ---
`joke_content` | the content of the joke

#### Example response

```json
{
  "joke_content": "Why don't skeletons fight each other? They don't have the guts."
}
```

### Add existing joke to a category by joke id

Adds already existing joke to a category by its id.

```endpoint
POST /v1/jokes/{id}/category/{category}
```

#### Example request

```curl
curl -X POST http://localhost:3333/v1/jokes/11/category/Science%20jokes
```

#### Example response

```json
{
    "id_joke": "11",
    "category": "Science jokes"
}
```

Property | Description
---|---
`id_joke` | Joke of id
`category` | Category of a joke

### Give joke a like

Give joke a like

```endpoint
POST /v1/jokes/{id}/like
```

#### Example request

```curl
curl -X POST http://localhost:3333/v1/jokes/1/like
```

#### Example response

```json
{
  "id_joke":"1"
}
```
Property | Description
---|---
`id_joke` | Joke of id

### Give joke a dislike

Give joke a dislike

```endpoint
POST /v1/jokes/{id}/dislike
```

#### Example request

```curl
curl -X POST http://localhost:3333/v1/jokes/1/dislike
```

#### Example response

```json
{
  "id_joke":"1"
}
```

Property | Description
---|---
`id_joke` | Joke of id
