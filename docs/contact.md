# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "id": 1,
  "first_name": "Rama",
  "last_name": "Fajar",
  "email": "fajar@gmail.com",
  "phone": "08123456789"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Rama",
    "last_name": "Fajar",
    "email": "fajar@gmail.com",
    "phone": "08123456789"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "id": 1,
  "first_name": "Rama Updated",
  "last_name": "Fajar Updated",
  "email": "fajar@gmail.com",
  "phone": "08123456789"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Rama Updated",
    "last_name": "Fajar Updated",
    "email": "fajar@gmail.com",
    "phone": "08123456789"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/{id}

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Rama",
    "last_name": "Fajar",
    "email": "fajar@gmail.com",
    "phone": "08123456789"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like,optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Rama",
      "last_name": "Fajar",
      "email": "fajar@gmail.com",
      "phone": "08123456789"
    },
    {
      "id": 2,
      "first_name": "Rama 2",
      "last_name": "Fajar 2",
      "email": "fajar2@gmail.com",
      "phone": "08223456789"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/{id}

Headers :

- Authorization : token

Response Body Success :

```json
{
  "message": "Success remove contact"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```
