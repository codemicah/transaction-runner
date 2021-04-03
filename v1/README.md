# Transaction Runner v1

## Authentication

You are provided with a token on signup with you will provide in the header of all endpoint calls.

The token should be passed with the name `x-access-token`

## Endpoints

1. POST **/auth/signup** - create account

- Body

  ```json
  {
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "password": "string"
  }
  ```

- Response
  ```json
  {
    "success": "boolean",
    "message": "string",
    "data": "object"
  }
  ```

2. POST **/auth/login** - login user account

- Body

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  - Response

  ```json
  {
    "success": "boolean",
    "message": "string",
    "data": "object"
  }
  ```

3. GET **/transactions** - Get all user transactions

- Headers
  ```json
  {
    "x-access-token": "string"
  }
  ```

4. POST **/transactions/send** - Transfer/send money

- Headers
  ```json
  {
    "x-access-token": "string"
  }
  ```
- Body

  ```json
  {
    "amount": "number"
  }
  ```

  - Response

  ```json
  {
    "success": "boolean",
    "message": "string",
    "data": "object"
  }
  ```

5. POST **/transactions/receive** - Add/receive money

- Headers
  ```json
  {
    "x-access-token": "string"
  }
  ```
- Body

  ```json
  {
    "amount": "number"
  }
  ```

  - Response

  ```json
  {
    "success": "boolean",
    "message": "string",
    "data": "object"
  }
  ```

6. GET **/users/profile** - retrieve user account info

- Headers
  ```json
  {
    "x-access-token": "string"
  }
  ```
