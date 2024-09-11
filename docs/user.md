# User API Spec

## Register User API

Endpoint : POST /api/users
Request Body :

```json
{
  "username": "nullsec45",
  "name": "Fajar",
  "password": "<password>"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "nullsec45",
    "name": "Fajar"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "nullsec45",
  "password": "<password>"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "<unique-token>"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or Password Wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/{idCurrent}

Headers :

- Authorization : "token"

Request Body :

```json
{
  "username": "fajar45",
  "name": "name updated",
  "password": "<new_password>"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "fajar45",
    "name": "Name update"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100 character"
}
```

## Get User API

Endpoint : GET /api/users/{idCurrent}

Headers :

- Authorization : "token"

Response Body Success :

```json
{
  "data": {
    "username": "nullsec45",
    "name": "Fajar"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthenticated"
}
```

## Logout User API

Endpoint : DELETE /api/users/{idCurrent}

Headers :

- Authorization : "token"

Reponse Body Success :

```json
{
  "data": "Logout success"
}
```

Response Body Error :

```json
{
  "errors": "Unauthenticated"
}
```
