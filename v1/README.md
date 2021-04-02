# Transaction Runner v1

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

4. POST **/transactions/send** - Transfer/send money

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
